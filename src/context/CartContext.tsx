import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string; // Database cart_item id, or Product ID if guest
  productId: string;
  name: string;
  category: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number, productDetails?: any) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const API_URL = "http://localhost:3000/api";

  const fetchCart = async () => {
    if (!token) {
      // Load guest cart from localStorage
      const guestCart = localStorage.getItem("papiah_guest_cart");
      if (guestCart) {
        try {
          setCartItems(JSON.parse(guestCart));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          const mapped: CartItem[] = data.items.map((item: any) => ({
            id: item.id,
            productId: item.products.id,
            name: item.products.title,
            category: item.products.categories?.name || "Premium Journal",
            variant: "Standard • A5",
            price: Number(item.products.price) || 0,
            quantity: item.quantity,
            image: item.products.cover_image || "",
            slug: item.products.slug || "product"
          }));
          setCartItems(mapped);
        }
      }
    } catch (err) {
      console.error("Error fetching cart from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token, user]);

  const addToCart = async (productId: string, quantity: number = 1, productDetails?: any) => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity })
        });
        if (res.ok) {
          await fetchCart();
        }
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    } else {
      // Guest cart logic
      setCartItems(prev => {
        const existingIdx = prev.findIndex(item => item.productId === productId);
        let updated: CartItem[];
        if (existingIdx > -1) {
          updated = prev.map((item, idx) => 
            idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          const newItem: CartItem = {
            id: productId,
            productId,
            name: productDetails?.name || "Untitled Journal",
            category: productDetails?.category || "Stationery",
            variant: "Standard • A5",
            price: productDetails?.price || 0,
            quantity,
            image: productDetails?.coverImage || productDetails?.image || "",
            slug: productDetails?.slug || "product"
          };
          updated = [...prev, newItem];
        }
        localStorage.setItem("papiah_guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart/${itemId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ quantity })
        });
        if (res.ok) {
          await fetchCart();
        }
      } catch (err) {
        console.error("Error updating cart item:", err);
      }
    } else {
      setCartItems(prev => {
        const updated = prev.map(item => 
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        localStorage.setItem("papiah_guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeItem = async (itemId: string) => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          await fetchCart();
        }
      } catch (err) {
        console.error("Error removing cart item:", err);
      }
    } else {
      setCartItems(prev => {
        const updated = prev.filter(item => item.id !== itemId);
        localStorage.setItem("papiah_guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart/clear`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem("papiah_guest_cart");
    }
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart, updateQuantity, removeItem, clearCart, cartSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
