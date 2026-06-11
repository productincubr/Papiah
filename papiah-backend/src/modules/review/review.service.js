import { supabase } from "../../config/supabase.js";

/**
 * Creates a product review.
 */
export const createReview = async ({ userId, productId, rating, title, review, images, isVerifiedPurchase }) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        user_id: userId,
        product_id: productId,
        rating,
        title,
        review,
        images: images || [],
        is_verified_purchase: isVerifiedPurchase !== undefined ? isVerifiedPurchase : false,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves reviews for a product, including user profile details.
 */
export const getProductReviews = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      users (
        id,
        first_name,
        last_name,
        avatar
      )
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Updates an existing review.
 */
export const updateReview = async (userId, reviewId, updateFields) => {
  const mappedFields = {};
  if (updateFields.rating !== undefined) mappedFields.rating = updateFields.rating;
  if (updateFields.title !== undefined) mappedFields.title = updateFields.title;
  if (updateFields.review !== undefined) mappedFields.review = updateFields.review;
  if (updateFields.images !== undefined) mappedFields.images = updateFields.images;

  const { data, error } = await supabase
    .from("reviews")
    .update(mappedFields)
    .eq("id", reviewId)
    .eq("user_id", userId) // security check: must be owned by the user
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletes a review.
 */
export const deleteReview = async (userId, reviewId) => {
  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", userId) // security check
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Calculates the average rating and total counts for a product.
 */
export const getAverageRating = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", productId);

  if (error) throw error;

  if (data.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }

  const sum = data.reduce((total, r) => total + r.rating, 0);
  const averageRating = parseFloat((sum / data.length).toFixed(1));

  return {
    averageRating,
    totalReviews: data.length,
  };
};
