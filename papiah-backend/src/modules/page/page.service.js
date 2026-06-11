import { supabase } from "../../config/supabase.js";

/**
 * Creates a new static page.
 */
export const createPage = async ({ title, slug, content, seoTitle, seoDescription }) => {
  const { data, error } = await supabase
    .from("pages")
    .insert([
      {
        title,
        slug,
        content,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves all static pages.
 */
export const getAllPages = async () => {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Retrieves a page by its slug.
 */
export const getPageBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Updates an existing static page.
 */
export const updatePage = async (id, updateFields) => {
  const mappedFields = {};
  if (updateFields.title !== undefined) mappedFields.title = updateFields.title;
  if (updateFields.slug !== undefined) mappedFields.slug = updateFields.slug;
  if (updateFields.content !== undefined) mappedFields.content = updateFields.content;
  if (updateFields.seoTitle !== undefined) mappedFields.seo_title = updateFields.seoTitle;
  if (updateFields.seoDescription !== undefined) mappedFields.seo_description = updateFields.seoDescription;

  const { data, error } = await supabase
    .from("pages")
    .update(mappedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletes a static page.
 */
export const deletePage = async (id) => {
  const { data, error } = await supabase
    .from("pages")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
