import { jest } from "@jest/globals";
import request from "supertest";

// 1. Mock Razorpay SDK
jest.unstable_mockModule("razorpay", () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        orders: {
          create: jest.fn().mockResolvedValue({
            id: "rzp_order_mock_123",
            amount: 112000, // in paise
            currency: "INR",
            receipt: "PAP-mock-1234",
          }),
        },
      };
    }),
  };
});

// 2. Mock Supabase Client
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
            return this;
          }),
          update: jest.fn().mockImplementation(function (data) {
            this.updateData = data;
            return this;
          }),
          delete: jest.fn().mockImplementation(function () {
            return this;
          }),
          eq: jest.fn().mockReturnThis(),
          lt: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          or: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          single: jest.fn().mockImplementation(function () {
            if (this.queryTable === "categories") {
              return {
                data: { id: "cat-1", name: "Notebooks", slug: "notebooks" },
                error: null,
              };
            }
            if (this.queryTable === "collections") {
              return {
                data: { id: "coll-1", name: "Wedding", slug: "wedding" },
                error: null,
              };
            }
            if (this.queryTable === "products") {
              return {
                data: { id: "prod-1", title: "Gratitude Journal", slug: "gratitude-journal", price: 999.00, stock: 10 },
                error: null,
              };
            }
            if (this.queryTable === "coupons") {
              return {
                data: { id: "coupon-1", code: "SAVE50", type: "fixed", value: 50.00, minimum_order: 200.00, is_active: true },
                error: null,
              };
            }
            if (this.queryTable === "carts") {
              return {
                data: { id: "cart-1", user_id: "mock-user-id" },
                error: null,
              };
            }
            if (this.queryTable === "cart_items") {
              return {
                data: { id: "item-1", cart_id: "cart-1", product_id: "prod-1", quantity: 2 },
                error: null,
              };
            }
            if (this.queryTable === "orders") {
              return {
                data: {
                  id: "order-1",
                  order_number: "PAP-mock-1234",
                  total: 1120.00,
                  user_id: "mock-user-id",
                  order_status: "pending",
                  order_items: [
                    { id: "item-1", product_id: "prod-1", quantity: 1, product_price: 999.00, product_title: "Journal", total: 999.00 }
                  ]
                },
                error: null,
              };
            }
            return { data: null, error: null };
          }),
          maybeSingle: jest.fn().mockImplementation(function () {
            if (this.queryTable === "carts") {
              return { data: { id: "cart-1", user_id: "mock-user-id" }, error: null };
            }
            if (this.queryTable === "coupons") {
              return {
                data: { id: "coupon-1", code: "SAVE50", type: "fixed", value: 50.00, minimum_order: 200.00, is_active: true },
                error: null,
              };
            }
            if (this.queryTable === "cart_items") {
              return { data: null, error: null };
            }
            if (this.queryTable === "products") {
              return {
                data: { id: "prod-1", title: "Gratitude Journal", slug: "gratitude-journal", price: 999.00, stock: 10 },
                error: null,
              };
            }
            return { data: null, error: null };
          }),
          selectStr: null,
          queryTable: table,
          then: function (resolve) {
            if (this.queryTable === "categories") {
              resolve({
                data: [
                  { id: "cat-1", name: "Notebooks", slug: "notebooks" },
                  { id: "cat-2", name: "Planners", slug: "planners" },
                ],
                error: null,
              });
            } else if (this.queryTable === "collections") {
              resolve({
                data: [
                  { id: "coll-1", name: "Wedding Collection", slug: "wedding" },
                ],
                error: null,
              });
            } else if (this.queryTable === "products") {
              resolve({
                data: [
                  { id: "prod-1", title: "Gratitude Journal", slug: "gratitude-journal", price: 999.00, stock: 10 },
                ],
                error: null,
              });
            } else if (this.queryTable === "cart_items") {
              resolve({
                data: [
                  {
                    id: "item-1",
                    quantity: 1,
                    products: {
                      id: "prod-1",
                      title: "Gratitude Journal",
                      slug: "gratitude-journal",
                      price: 999.00,
                      stock: 10,
                    },
                  },
                ],
                error: null,
              });
            } else if (this.queryTable === "wishlists") {
              resolve({
                data: [
                  {
                    id: "wish-1",
                    products: {
                      id: "prod-1",
                      title: "Gratitude Journal",
                      price: 999.00,
                    },
                  },
                ],
                error: null,
              });
            } else if (this.queryTable === "reviews") {
              resolve({
                data: [
                  { id: "rev-1", rating: 5, review: "Great product!" },
                ],
                error: null,
              });
            } else if (this.queryTable === "orders") {
              resolve({
                data: [
                  { id: "order-1", order_number: "PAP-mock-1234", total: 1120.00, user_id: "mock-user-id", order_status: "pending" },
                ],
                error: null,
              });
            } else if (this.queryTable === "order_items") {
              resolve({
                data: [
                  { id: "item-1", product_title: "Gratitude Journal", product_price: 999.00, quantity: 1, total: 999.00 },
                ],
                error: null,
              });
            } else {
              resolve({ data: [], error: null });
            }
          },
        };
      }),
    },
  };
});

// Dynamically import resources after mocks
const { default: app } = await import("../../index.js");
const { supabase } = await import("../config/supabase.js");

describe("Modular Integration Flows Tests (Products, Cart, Coupons, Order, Payments)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Categories, Collections & Products Lifecycle
  describe("Catalog & Product Lifecycle Flows", () => {
    it("should fetch categories list", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].slug).toBe("notebooks");
    });

    it("should fetch collections list", async () => {
      const res = await request(app).get("/api/collections");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should query products list with filtering options", async () => {
      const res = await request(app)
        .get("/api/products")
        .query({ search: "journal", category: "notebooks" });
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should create a new product", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({
          title: "New Planner",
          slug: "new-planner",
          price: 500,
          stock: 50,
          status: "active",
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toContain("successfully");
      expect(res.body.product.title).toBe("Gratitude Journal"); // returns mock db response
    });

    it("should update product details", async () => {
      const res = await request(app)
        .patch("/api/products/prod-1")
        .send({
          price: 1100,
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("successfully");
    });

    it("should delete a product", async () => {
      const res = await request(app)
        .delete("/api/products/prod-1");

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("deleted");
    });
  });

  // 2. Cart & Wishlist
  describe("Cart & Wishlist Flows", () => {
    it("should fetch active user cart", async () => {
      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.subtotal).toBe(999.00);
      expect(res.body.items.length).toBe(1);
    });

    it("should add a product to user cart", async () => {
      const res = await request(app)
        .post("/api/cart/add")
        .set("Authorization", "Bearer mock-access-token")
        .send({ productId: "prod-1", quantity: 1 });

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("added to cart");
    });

    it("should fetch user wishlist", async () => {
      const res = await request(app)
        .get("/api/wishlist")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  // 3. Coupons & Order Placement Lifecycle Flow
  describe("Coupons & Order Lifecycle Flow", () => {
    it("should validate an active discount coupon", async () => {
      const res = await request(app)
        .post("/api/coupons/validate")
        .send({ code: "SAVE50", orderAmount: 999.00 });

      expect(res.status).toBe(200);
      expect(res.body.valid).toBe(true);
      expect(res.body.discountAmount).toBe(50.00);
    });

    it("should initiate checkout and place an order", async () => {
      const res = await request(app)
        .post("/api/orders/create")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          addressId: "address-uuid-123",
          couponCode: "SAVE50",
          shippingSpeed: "standard",
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toContain("placed successfully");
      expect(res.body.order.order_number).toBe("PAP-mock-1234");
    });

    it("should retrieve user orders list", async () => {
      const res = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should retrieve a single order by ID", async () => {
      const res = await request(app)
        .get("/api/orders/order-1")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.order_number).toBe("PAP-mock-1234");
    });

    it("should cancel an active order", async () => {
      const res = await request(app)
        .patch("/api/orders/order-1/cancel")
        .set("Authorization", "Bearer mock-access-token");

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("cancelled successfully");
    });

    it("should update order status", async () => {
      const res = await request(app)
        .patch("/api/orders/order-1/status")
        .set("Authorization", "Bearer mock-access-token")
        .send({
          status: "processing",
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toContain("status updated successfully");
    });
  });

  // 4. Payment Integrations
  describe("Razorpay Payment Gateway Integration Flow", () => {
    it("should initiate a Razorpay checkout session", async () => {
      const res = await request(app)
        .post("/api/payments/create-razorpay-order")
        .set("Authorization", "Bearer mock-access-token")
        .send({ orderId: "order-1" });

      expect(res.status).toBe(200);
      expect(res.body.id).toBe("rzp_order_mock_123");
      expect(res.body.amount).toBe(112000); // 1120.00 INR in paise
    });
  });
});
