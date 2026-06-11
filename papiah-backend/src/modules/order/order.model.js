/**
 * Order Model Schema Representation
 * Database Tables: public.orders and public.order_items
 * 
 * Orders Fields:
 * - id (UUID, PK)
 * - user_id (UUID, REFERENCES users.id)
 * - order_number (TEXT, UNIQUE, NOT NULL)
 * - address_id (UUID, REFERENCES addresses.id)
 * - subtotal (NUMERIC)
 * - shipping (NUMERIC)
 * - tax (NUMERIC)
 * - discount (NUMERIC)
 * - total (NUMERIC)
 * - payment_method (TEXT)
 * - payment_status (TEXT, CHECK IN ('pending', 'paid', 'failed', 'refunded'))
 * - order_status (TEXT, CHECK IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
 * - tracking_number (TEXT)
 * - notes (TEXT)
 * - created_at (TIMESTAMP)
 * 
 * Order Items Fields:
 * - id (UUID, PK)
 * - order_id (UUID, REFERENCES orders.id, NOT NULL)
 * - product_id (UUID, REFERENCES products.id, NULL)
 * - product_title (TEXT, NOT NULL)
 * - product_price (NUMERIC, NOT NULL)
 * - quantity (INTEGER, NOT NULL)
 * - total (NUMERIC, NOT NULL)
 */

export const OrderSchema = {
  id: "uuid",
  userId: "uuid?",
  orderNumber: "string",
  addressId: "uuid?",
  subtotal: "number",
  shipping: "number",
  tax: "number",
  discount: "number",
  total: "number",
  paymentMethod: "string?",
  paymentStatus: "string", // 'pending', 'paid', 'failed', 'refunded'
  orderStatus: "string", // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  trackingNumber: "string?",
  notes: "string?",
  createdAt: "date",
};
