import * as reviewService from "./review.service.js";

export const create = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId, rating, title, review, images, isVerifiedPurchase } = req.body;
    if (!productId || !rating) {
      return res.status(400).json({ error: "Product ID and rating are required" });
    }

    const newReview = await reviewService.createReview({
      userId,
      productId,
      rating,
      title,
      review,
      images,
      isVerifiedPurchase,
    });

    return res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error("Create Review Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getProductReviews(productId);
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Product Reviews Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { reviewId } = req.params;
    const updatedReview = await reviewService.updateReview(userId, reviewId, req.body);
    return res.status(200).json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Update Review Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { reviewId } = req.params;
    await reviewService.deleteReview(userId, reviewId);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const { productId } = req.params;
    const stats = await reviewService.getAverageRating(productId);
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Get Review Stats Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
