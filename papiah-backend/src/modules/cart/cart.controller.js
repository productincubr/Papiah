import * as cartService from "./cart.service.js";

export const add = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const qty = parseInt(quantity) || 1;
    const cartItem = await cartService.addToCart(userId, productId, qty);

    return res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const cart = await cartService.getCart(userId);
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive integer" });
    }

    const updatedItem = await cartService.updateCartItem(userId, itemId, parseInt(quantity));
    return res.status(200).json({ message: "Cart item updated", updatedItem });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { itemId } = req.params;
    await cartService.removeCartItem(userId, itemId);

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const clear = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const result = await cartService.clearCart(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
