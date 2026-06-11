import { jest } from "@jest/globals";
import request from "supertest";

// Mock the Supabase client configuration module
jest.unstable_mockModule("../config/supabase.js", () => {
  return {
    supabase: {
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
        getUser: jest.fn(),
        updateUser: jest.fn(),
        setSession: jest.fn().mockResolvedValue({ data: {}, error: null }),
      },
      from: jest.fn().mockImplementation((table) => {
        return {
          select: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockImplementation(() => {
            if (table === "users") {
              return {
                data: {
                  id: "mock-user-id",
                  first_name: "John",
                  last_name: "Doe",
                  email: "john.doe@example.com",
                  phone: "1234567890",
                  avatar: "https://avatar.url",
                  role: "customer",
                },
                error: null,
              };
            }
            return { data: null, error: null };
          }),
        };
      }),
    },
  };
});

// Dynamically import app and mocked supabase to respect ES Modules mocking order
const { default: app } = await import("../../index.js");
const { supabase } = await import("../config/supabase.js");

describe("User Authentication & Profile Flow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/register", () => {
    it("should register a new user successfully", async () => {
      supabase.auth.signUp.mockResolvedValue({
        data: {
          user: {
            id: "mock-user-id",
            email: "john.doe@example.com",
          },
          session: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token",
          },
        },
        error: null,
      });

      const res = await request(app)
        .post("/api/users/register")
        .send({
          email: "john.doe@example.com",
          password: "securePassword123",
          firstName: "John",
          lastName: "Doe",
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toContain("registered successfully");
      expect(res.body.user.id).toBe("mock-user-id");
      expect(supabase.auth.signUp).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if email or password is missing", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({
          firstName: "John",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("required");
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in user and return session details", async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: {
            id: "mock-user-id",
            email: "john.doe@example.com",
          },
          session: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token",
          },
        },
        error: null,
      });

      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "john.doe@example.com",
          password: "securePassword123",
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("Login successful");
      expect(res.body.session.access_token).toBe("mock-access-token");
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /api/users/profile", () => {
    it("should update user profile details", async () => {
      // Mock authorization getUser call
      supabase.auth.getUser.mockResolvedValue({
        data: {
          user: {
            id: "mock-user-id",
            email: "john.doe@example.com",
          },
        },
        error: null,
      });

      const res = await request(app)
        .put("/api/users/profile")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          firstName: "Johnny",
          phone: "9876543210",
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("updated successfully");
      expect(res.body.user.first_name).toBe("John"); // Returns mock db response
      expect(supabase.auth.getUser).toHaveBeenCalledTimes(1); // once for authMiddleware
    });

    it("should deny access if token is missing", async () => {
      const res = await request(app)
        .put("/api/users/profile")
        .send({
          firstName: "Johnny",
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain("missing");
    });
  });

  describe("POST /api/users/logout", () => {
    it("should log out user successfully", async () => {
      supabase.auth.signOut.mockResolvedValue({ error: null });

      const res = await request(app)
        .post("/api/users/logout")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("logged out");
    });
  });
});
