import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { supabase } from "./src/config/supabase.js";

// Import Routes
import userRoutes from "./src/routes/userRoutes.js";
import categoryRoutes from "./src/modules/category/category.routes.js";
import collectionRoutes from "./src/modules/collection/collection.routes.js";
import productRoutes from "./src/modules/product/product.routes.js";
import cartRoutes from "./src/modules/cart/cart.routes.js";
import wishlistRoutes from "./src/modules/wishlist/wishlist.routes.js";
import reviewRoutes from "./src/modules/review/review.routes.js";
import couponRoutes from "./src/modules/coupon/coupon.routes.js";
import orderRoutes from "./src/modules/order/order.routes.js";
import paymentRoutes from "./src/modules/payment/payment.routes.js";
import profileRoutes from "./src/modules/profile/profile.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import newsletterRoutes from "./src/modules/newsletter/newsletter.routes.js";
import contactRoutes from "./src/modules/contact/contact.routes.js";
import addressRoutes from "./src/modules/address/address.routes.js";
import uploadRoutes from "./src/modules/upload/upload.routes.js";
import pageRoutes from "./src/modules/page/page.routes.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Register API Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/pages", pageRoutes);

app.get("/", (req, res) => {



  res.json({ message: "Papiah backend is running" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

process.on("SIGINT", () => {
  process.exit(0);
});

export default app;