/**
 * Collection Model Schema Representation
 * Database Table: public.collections
 * 
 * Fields:
 * - id (UUID, PK)
 * - name (TEXT, NOT NULL)
 * - slug (TEXT, UNIQUE, NOT NULL)
 * - description (TEXT, NULL)
 * - hero_image (TEXT, NULL)
 * - accent_color (TEXT, NULL)
 * - order_index (INTEGER, DEFAULT 0)
 * - is_featured (BOOLEAN, DEFAULT FALSE)
 */

export const CollectionSchema = {
  id: "uuid",
  name: "string",
  slug: "string",
  description: "string?",
  heroImage: "string?",
  accentColor: "string?",
  orderIndex: "number",
  isFeatured: "boolean",
};
