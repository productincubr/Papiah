import { supabase } from "../../config/supabase.js";

/**
 * Aggregates high-level admin dashboard statistics.
 */
export const getDashboardStats = async () => {
  // 1. Total Revenue (sum of total for paid orders)
  const { data: revenueData, error: revenueError } = await supabase
    .from("orders")
    .select("total")
    .eq("payment_status", "paid");

  if (revenueError) throw revenueError;
  const totalRevenue = revenueData.reduce((sum, order) => sum + parseFloat(order.total), 0);

  // 2. Total Orders
  const { count: totalOrders, error: orderCountError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  if (orderCountError) throw orderCountError;

  // 3. Total Customers
  const { count: totalCustomers, error: customerCountError } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  if (customerCountError) throw customerCountError;

  // 4. Low Stock Products (stock < 5)
  const { data: lowStockProducts, count: lowStockCount, error: stockError } = await supabase
    .from("products")
    .select("id, title, stock", { count: "exact" })
    .lt("stock", 5);

  if (stockError) throw stockError;

  // 5. Pending Orders
  const { count: pendingOrders, error: pendingError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("order_status", "pending");

  if (pendingError) throw pendingError;

  // 6. Best Sellers
  const { data: bestSellers, error: bsError } = await supabase
    .from("products")
    .select("id, title, price, cover_image, stock")
    .eq("is_bestseller", true)
    .limit(5);

  if (bsError) throw bsError;

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalOrders: totalOrders || 0,
    totalCustomers: totalCustomers || 0,
    lowStockCount: lowStockCount || 0,
    lowStockProducts: lowStockProducts || [],
    pendingOrders: pendingOrders || 0,
    bestSellers: bestSellers || [],
  };
};

/**
 * Retrieves all orders with simple user details.
 */
export const getAdminOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      users (
        id,
        first_name,
        last_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Retrieves all products (including draft ones) for admin management.
 */
export const getAdminProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (name),
      collections (name)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Retrieves all customers.
 */
export const getAdminCustomers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
