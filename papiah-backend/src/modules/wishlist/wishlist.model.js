/**
 * Wishlist Model Schema Representation
 * Database Table: public.wishlists
 * 
 * Fields:
 * - id (UUID, PK)
 * - user_id (UUID, REFERENCES users.id, NOT NULL)
 * - product_id (UUID, REFERENCES products.id, NOT NULL)
 * - created_at (TIMESTAMP)
 * 
 * Unique Constraints:
 * - UNIQUE(user_id, product_id)
 */

export const WishlistSchema = {
  id: "uuid",
  userId: "uuid",
  productId: "uuid",
  createdAt: "date",
};
