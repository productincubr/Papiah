import { jest } from "@jest/globals";
import request from "supertest";

// Mock Supabase Client
jest.unstable_mockModule("../config/supabase.js", () => {
  return {
    supabase: {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: {
            user: {
              id: "mock-user-id",
              email: "john.doe@example.com",
            },
          },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table) => {
        return {
          select: jest.fn().mockImplementation(function (selectStr) {
            this.queryTable = table;
            return this;
          }),
          insert: jest.fn().mockImplementation(function (data) {
            this.insertData = data;
            this.queryTable = table;
            return this;
          }),
          update: jest.fn().mockImplementation(function (data) {
            this.updateData = data;
            this.queryTable = table;
            return this;
          }),
          delete: jest.fn().mockImplementation(function () {
            this.queryTable = table;
            return this;
          }),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          maybeSingle: jest.fn().mockImplementation(function () {
            if (this.queryTable === "addresses") {
              return {
                data: {
                  id: "mock-address-id",
                  user_id: "mock-user-id",
                  label: "Home",
                  full_name: "John Doe",
                  phone: "1234567890",
                  address_line1: "123 Main St",
                  city: "Mumbai",
                  state: "Maharashtra",
                  postal_code: "400001",
                  is_default: true,
                },
                error: null,
              };
            }
            if (this.queryTable === "users") {
              return {
                data: {
                  id: "mock-user-id",
                  role: "customer",
                },
                error: null,
              };
            }
            return { data: null, error: null };
          }),
          single: jest.fn().mockImplementation(function () {
            if (this.queryTable === "addresses") {
              const base = {
                id: "mock-address-id",
                user_id: "mock-user-id",
                label: "Home",
                full_name: "John Doe",
                phone: "1234567890",
                address_line1: "123 Main St",
                city: "Mumbai",
                state: "Maharashtra",
                postal_code: "400001",
                is_default: true,
              };
              if (this.insertData) {
                return {
                  data: { ...base, ...this.insertData[0] },
                  error: null,
                };
              }
              if (this.updateData) {
                return {
                  data: { ...base, ...this.updateData },
                  error: null,
                };
              }
              return { data: base, error: null };
            }
            if (this.queryTable === "users") {
              return {
                data: {
                  id: "mock-user-id",
                  role: "customer",
                },
                error: null,
              };
            }
            return { data: null, error: null };
          }),
          then: function (resolve) {
            if (this.queryTable === "addresses") {
              resolve({
                data: [
                  {
                    id: "mock-address-id",
                    user_id: "mock-user-id",
                    label: "Home",
                    full_name: "John Doe",
                    phone: "1234567890",
                    address_line1: "123 Main St",
                    city: "Mumbai",
                    state: "Maharashtra",
                    postal_code: "400001",
                    is_default: true,
                  }
                ],
                error: null,
              });
            } else {
              resolve({ data: [], error: null });
            }
          }
        };
      }),
    },
  };
});

// Dynamically import app and mocked supabase to respect ES Modules mocking order
const { default: app } = await import("../../index.js");
const { supabase } = await import("../config/supabase.js");

describe("Address Module Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/addresses", () => {
    it("should fetch all addresses for the authenticated user", async () => {
      const res = await request(app)
        .get("/api/addresses")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].full_name).toBe("John Doe");
    });
  });

  describe("POST /api/addresses", () => {
    it("should create a new address successfully", async () => {
      const res = await request(app)
        .post("/api/addresses")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          label: "Home",
          full_name: "John Doe",
          phone: "1234567890",
          address_line1: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          postal_code: "400001",
        });

      expect(res.status).toBe(201);
      expect(res.body.full_name).toBe("John Doe");
      expect(res.body.city).toBe("Mumbai");
    });

    it("should fail if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/addresses")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          label: "Home",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("Missing required address fields");
    });
  });

  describe("PATCH /api/addresses/:id", () => {
    it("should update an existing address successfully", async () => {
      const res = await request(app)
        .patch("/api/addresses/mock-address-id")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          city: "Pune",
          label: "Office",
        });

      expect(res.status).toBe(200);
      expect(res.body.city).toBe("Pune");
      expect(res.body.label).toBe("Office");
    });
  });

  describe("PATCH /api/addresses/:id/default", () => {
    it("should set an address as default", async () => {
      const res = await request(app)
        .patch("/api/addresses/mock-address-id/default")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.is_default).toBe(true);
    });
  });

  describe("DELETE /api/addresses/:id", () => {
    it("should delete an address", async () => {
      const res = await request(app)
        .delete("/api/addresses/mock-address-id")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
