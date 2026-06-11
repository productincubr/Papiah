import { supabase } from "../../config/supabase.js";

/**
 * Creates a new category.
 */
export const createCategory = async ({ name, slug, description, image, parentCategoryId, isActive }) => {
  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name,
        slug,
        description,
        image,
        parent_category_id: parentCategoryId || null,
        is_active: isActive !== undefined ? isActive : true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves all categories.
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Retrieves a category by its slug.
 */
export const getCategoryBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Updates an existing category.
 */
export const updateCategory = async (id, updateFields) => {
  const mappedFields = {};
  if (updateFields.name !== undefined) mappedFields.name = updateFields.name;
  if (updateFields.slug !== undefined) mappedFields.slug = updateFields.slug;
  if (updateFields.description !== undefined) mappedFields.description = updateFields.description;
  if (updateFields.image !== undefined) mappedFields.image = updateFields.image;
  if (updateFields.parentCategoryId !== undefined) mappedFields.parent_category_id = updateFields.parentCategoryId || null;
  if (updateFields.isActive !== undefined) mappedFields.is_active = updateFields.isActive;

  const { data, error } = await supabase
    .from("categories")
    .update(mappedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletes a category.
 */
export const deleteCategory = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
