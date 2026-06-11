import { supabase } from "../../config/supabase.js";

/**
 * Creates a new collection.
 */
export const createCollection = async ({ name, slug, description, heroImage, accentColor, orderIndex, isFeatured }) => {
  const { data, error } = await supabase
    .from("collections")
    .insert([
      {
        name,
        slug,
        description,
        hero_image: heroImage,
        accent_color: accentColor,
        order_index: orderIndex !== undefined ? orderIndex : 0,
        is_featured: isFeatured !== undefined ? isFeatured : false,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves all collections.
 */
export const getAllCollections = async () => {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Retrieves featured collections.
 */
export const getFeaturedCollections = async () => {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Retrieves a collection by slug.
 */
export const getCollectionBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Updates a collection.
 */
export const updateCollection = async (id, updateFields) => {
  const mappedFields = {};
  if (updateFields.name !== undefined) mappedFields.name = updateFields.name;
  if (updateFields.slug !== undefined) mappedFields.slug = updateFields.slug;
  if (updateFields.description !== undefined) mappedFields.description = updateFields.description;
  if (updateFields.heroImage !== undefined) mappedFields.hero_image = updateFields.heroImage;
  if (updateFields.accentColor !== undefined) mappedFields.accent_color = updateFields.accentColor;
  if (updateFields.orderIndex !== undefined) mappedFields.order_index = updateFields.orderIndex;
  if (updateFields.isFeatured !== undefined) mappedFields.is_featured = updateFields.isFeatured;

  const { data, error } = await supabase
    .from("collections")
    .update(mappedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletes a collection.
 */
export const deleteCollection = async (id) => {
  const { data, error } = await supabase
    .from("collections")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
