/**
 * Review Model Schema Representation
 * Database Table: public.reviews
 * 
 * Fields:
 * - id (UUID, PK)
 * - user_id (UUID, REFERENCES users.id, NOT NULL)
 * - product_id (UUID, REFERENCES products.id, NOT NULL)
 * - rating (INTEGER, CHECK >= 1 AND <= 5, NOT NULL)
 * - title (TEXT, NULL)
 * - review (TEXT, NULL)
 * - images (TEXT ARRAY, DEFAULT [])
 * - is_verified_purchase (BOOLEAN, DEFAULT FALSE)
 * - created_at (TIMESTAMP)
 */

export const ReviewSchema = {
  id: "uuid",
  userId: "uuid",
  productId: "uuid",
  rating: "number",
  title: "string?",
  review: "string?",
  images: "string[]",
  isVerifiedPurchase: "boolean",
  createdAt: "date",
};
