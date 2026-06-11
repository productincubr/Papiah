import * as wishlistService from "./wishlist.service.js";

export const add = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const wishlistItem = await wishlistService.addToWishlist(userId, productId);
    return res.status(200).json({ message: "Product added to wishlist", wishlistItem });
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    await wishlistService.removeFromWishlist(userId, productId);
    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Remove from Wishlist Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const wishlist = await wishlistService.getUserWishlist(userId);
    return res.status(200).json(wishlist);
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const isWishlisted = await wishlistService.isProductWishlisted(userId, productId);
    return res.status(200).json({ isWishlisted });
  } catch (error) {
    console.error("Check Wishlist Status Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
