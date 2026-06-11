/**
 * Category Model Schema Representation
 * Database Table: public.categories
 * 
 * Fields:
 * - id (UUID, PK)
 * - name (TEXT, NOT NULL)
 * - slug (TEXT, UNIQUE, NOT NULL)
 * - description (TEXT, NULL)
 * - image (TEXT, NULL)
 * - parent_category_id (UUID, REFERENCES categories.id, NULL)
 * - is_active (BOOLEAN, DEFAULT TRUE)
 */

export const CategorySchema = {
  id: "uuid",
  name: "string",
  slug: "string",
  description: "string?",
  image: "string?",
  parentCategoryId: "uuid?",
  isActive: "boolean",
};
