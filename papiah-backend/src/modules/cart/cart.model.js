/**
 * Cart Model Schema Representation
 * Database Tables: public.carts and public.cart_items
 * 
 * Carts Fields:
 * - id (UUID, PK)
 * - user_id (UUID, REFERENCES users.id, UNIQUE, NOT NULL)
 * - created_at (TIMESTAMP)
 * 
 * Cart Items Fields:
 * - id (UUID, PK)
 * - cart_id (UUID, REFERENCES carts.id, NOT NULL)
 * - product_id (UUID, REFERENCES products.id, NOT NULL)
 * - quantity (INTEGER, DEFAULT 1, CHECK > 0)
 */

export const CartSchema = {
  id: "uuid",
  userId: "uuid",
  createdAt: "date",
};

export const CartItemSchema = {
  id: "uuid",
  cartId: "uuid",
  productId: "uuid",
  quantity: "number",
};
