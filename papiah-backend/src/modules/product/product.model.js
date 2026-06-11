/**
 * Product Model Schema Representation
 * Database Table: public.products
 * 
 * Fields:
 * - id (UUID, PK)
 * - title (TEXT, NOT NULL)
 * - slug (TEXT, UNIQUE, NOT NULL)
 * - short_description (TEXT, NULL)
 * - description (TEXT, NULL)
 * - sku (TEXT, UNIQUE, NULL)
 * - category_id (UUID, REFERENCES categories.id, NULL)
 * - collection_id (UUID, REFERENCES collections.id, NULL)
 * - price (NUMERIC, NOT NULL)
 * - compare_price (NUMERIC, NULL)
 * - cost_price (NUMERIC, NULL)
 * - stock (INTEGER, DEFAULT 0)
 * - weight (NUMERIC, NULL)
 * - cover_image (TEXT, NULL)
 * - status (TEXT, DEFAULT 'draft')
 * - is_featured (BOOLEAN, DEFAULT FALSE)
 * - is_bestseller (BOOLEAN, DEFAULT FALSE)
 * - is_new (BOOLEAN, DEFAULT TRUE)
 * - seo_title (TEXT, NULL)
 * - seo_description (TEXT, NULL)
 * - created_at (TIMESTAMP)
 * - updated_at (TIMESTAMP)
 */

export const ProductSchema = {
  id: "uuid",
  title: "string",
  slug: "string",
  shortDescription: "string?",
  description: "string?",
  sku: "string?",
  categoryId: "uuid?",
  collectionId: "uuid?",
  price: "number",
  comparePrice: "number?",
  costPrice: "number?",
  stock: "number",
  weight: "number?",
  coverImage: "string?",
  status: "string", // 'draft', 'active'
  isFeatured: "boolean",
  isBestseller: "boolean",
  isNew: "boolean",
  seoTitle: "string?",
  seoDescription: "string?",
  createdAt: "date",
  updatedAt: "date",
};
