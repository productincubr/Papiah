import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockCount: number;
  lowStockProducts: { id: string; title: string; stock: number }[];
  pendingOrders: number;
  bestSellers: { id: string; title: string; price: number; cover_image: string; stock: number }[];
}

interface Order {
  id: string;
  order_number: string;
  subtotal: string | number;
  shipping: string | number;
  tax: string | number;
  discount: string | number;
  total: string | number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  users?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface AdminProduct {
  id: string;
  title: string;
  slug: string;
  sku: string;
  price: string | number;
  compare_price?: string | number;
  stock: number;
  cover_image?: string;
  status: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  short_description?: string;
  description?: string;
  category_id?: string;
  collection_id?: string;
  categories?: { name: string };
  collections?: { name: string };
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  reward_points: number;
  created_at: string;
}

export default function AdminPage() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard");

  // State Variables
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [collections, setCollections] = useState<{ id: string; name: string }[]>([]);

  // Loading States
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Form States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    sku: "",
    categoryId: "",
    collectionId: "",
    price: 0,
    comparePrice: 0,
    costPrice: 0,
    stock: 0,
    coverImage: "",
    status: "active",
    isFeatured: false,
    isBestseller: false,
    isNew: true
  });
  const [productSaving, setProductSaving] = useState(false);
  const [productFormError, setProductFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [statsError, setStatsError] = useState("");

  // Order Status Edit
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [statusVal, setStatusVal] = useState("");

  // Redirect to login or profile if not admin
  useEffect(() => {
    const verifyAdmin = () => {
      const storedToken = localStorage.getItem("papiah_token");
      const storedUser = localStorage.getItem("papiah_user");
      
      if (!storedToken && !token) {
        window.history.pushState(null, "", "/login");
        return;
      }
      
      if (storedUser) {
        try {
          const u = JSON.parse(storedUser);
          if (u.role !== "admin") {
            window.history.pushState(null, "", "/profile");
          }
        } catch (e) {
          window.history.pushState(null, "", "/profile");
        }
      }
    };
    verifyAdmin();
  }, [user, token]);

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    if (!token) return;
    try {
      setLoadingStats(true);
      setStatsError("");
      const res = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatsError(errData.error || `Server error (status ${res.status})`);
      }
    } catch (err: any) {
      console.error("Error fetching admin stats:", err);
      setStatsError("Failed to connect to the server. Please ensure the backend is running.");
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoadingOrders(true);
      const res = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching admin orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    if (!token) return;
    try {
      setLoadingProducts(true);
      const res = await fetch(`${API_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching admin products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch Customers
  const fetchCustomers = async () => {
    if (!token) return;
    try {
      setLoadingCustomers(true);
      const res = await fetch(`${API_URL}/admin/customers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error("Error fetching admin customers:", err);
    } finally {
      setLoadingCustomers(false);
    }
  };

  // Fetch Categories & Collections for selector dropdowns
  const fetchSelectOptions = async () => {
    try {
      const catRes = await fetch(`${API_URL}/categories`);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
      const colRes = await fetch(`${API_URL}/collections`);
      if (colRes.ok) {
        const colData = await colRes.json();
        setCollections(colData);
      }
    } catch (err) {
      console.error("Error fetching metadata categories:", err);
    }
  };

  // Load active tab data
  useEffect(() => {
    if (token) {
      fetchSelectOptions();
      if (activeTab === "Dashboard") {
        fetchDashboardStats();
      } else if (activeTab === "Orders") {
        fetchOrders();
      } else if (activeTab === "Products") {
        fetchProducts();
      } else if (activeTab === "Customers") {
        fetchCustomers();
      }
    }
  }, [activeTab, token]);

  // Product Form Handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setProductForm(prev => ({ ...prev, title, slug }));
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      sku: "",
      categoryId: categories[0]?.id || "",
      collectionId: collections[0]?.id || "",
      price: 0,
      comparePrice: 0,
      costPrice: 0,
      stock: 10,
      coverImage: "",
      status: "active",
      isFeatured: false,
      isBestseller: false,
      isNew: true
    });
    setProductFormError("");
    setImageInputMode("upload");
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: AdminProduct) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      slug: prod.slug,
      shortDescription: prod.short_description || "",
      description: prod.description || "",
      sku: prod.sku || "",
      categoryId: prod.category_id || "",
      collectionId: prod.collection_id || "",
      price: Number(prod.price) || 0,
      comparePrice: Number(prod.compare_price) || 0,
      costPrice: 0,
      stock: prod.stock || 0,
      coverImage: prod.cover_image || "",
      status: prod.status || "active",
      isFeatured: prod.is_featured,
      isBestseller: prod.is_bestseller,
      isNew: prod.is_new
    });
    setProductFormError("");
    setImageInputMode("upload");
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.slug || !productForm.price) {
      setProductFormError("Title, Slug and Price are required.");
      return;
    }
    
    setProductSaving(true);
    setProductFormError("");
    try {
      const url = editingProductId 
        ? `${API_URL}/products/${editingProductId}`
        : `${API_URL}/products`;
      const method = editingProductId ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });
      const resData = await res.json();
      if (res.ok) {
        setIsProductModalOpen(false);
        fetchProducts();
        fetchDashboardStats();
      } else {
        setProductFormError(resData.error || "Failed to save product.");
      }
    } catch (err: any) {
      setProductFormError(err.message || "Network error. Failed to save.");
    } finally {
      setProductSaving(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setProductForm(prev => ({ ...prev, coverImage: data.url }));
      } else {
        alert(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image. Please check your connection.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
        fetchDashboardStats();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  // Order Status Handler
  const handleUpdateOrderStatus = async (orderId: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: statusVal })
      });
      if (res.ok) {
        setUpdatingOrderId(null);
        fetchOrders();
        fetchDashboardStats();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2B29] font-sans relative overflow-hidden paper-texture select-none selection:bg-[#EAD9FA]">
      
      {/* 1. ANNOUNCEMENT STRIP */}
      <div className="w-full bg-[#2F3A2A] py-2 px-4 text-center z-50 relative select-none">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-[#FAF9F6] uppercase">
          PAPIAH ADMIN PORTAL • OVERALL BUSINESS MANAGER
        </span>
      </div>

      {/* 2. NAVBAR */}
      <Navbar />

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-12 py-10 min-h-[70vh]">
        
        {/* Editorial Page Header */}
        <div className="text-left mb-10 border-b border-[#E8E7E3] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-playfair text-3xl md:text-4.5xl text-[#2F3A2A] font-light leading-tight tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-light mt-1.5 uppercase tracking-widest">
              Manage journals, track customer orders, and analyze stationery business.
            </p>
          </div>

          {/* Tab Navigation Menu */}
          <div className="flex flex-row overflow-x-auto gap-2 scrollbar-none pb-1 shrink-0">
            {["Dashboard", "Orders", "Products", "Customers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold tracking-widest rounded-lg border transition-all duration-200 cursor-pointer uppercase ${
                  activeTab === tab
                    ? "bg-[#2F3A2A] text-white border-[#2F3A2A] shadow-xs"
                    : "bg-white text-gray-650 border-[#E8E7E3] hover:text-[#2F3A2A] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TABS RENDERING */}
        {/* ==================================================================== */}

        {/* 3.1 DASHBOARD OVERVIEW TAB */}
        {activeTab === "Dashboard" && (
          <div className="flex flex-col gap-8">
            {loadingStats ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-[#8E76B8] border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <>
                {statsError && (
                  <div className="bg-[#FCECEB] border border-[#FCECEB] text-[#9E4C41] px-5 py-4 rounded-xl text-xs font-semibold leading-normal text-left flex flex-col gap-1">
                    <span className="uppercase tracking-wider font-bold">Dashboard Sync Error</span>
                    <span>{statsError}</span>
                  </div>
                )}

                {/* Stats Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {/* Revenue Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-5 shadow-xs text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Revenue</span>
                    <h2 className="font-playfair text-2xl md:text-3.5xl font-light text-[#2F3A2A] mt-2">
                      ₹{(stats?.totalRevenue ?? 0).toLocaleString()}
                    </h2>
                    <p className="text-[10px] text-green-600 mt-1.5 font-medium uppercase tracking-wider">▲ Live Sales</p>
                  </div>

                  {/* Orders Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-5 shadow-xs text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Orders</span>
                    <h2 className="font-playfair text-2xl md:text-3.5xl font-light text-[#2F3A2A] mt-2">
                      {stats?.totalOrders ?? 0}
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider">All checkouts</p>
                  </div>

                  {/* Customers Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-5 shadow-xs text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customers</span>
                    <h2 className="font-playfair text-2xl md:text-3.5xl font-light text-[#2F3A2A] mt-2">
                      {stats?.totalCustomers ?? 0}
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider">Active users</p>
                  </div>

                  {/* Pending Orders Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-5 shadow-xs text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Shipments</span>
                    <h2 className="font-playfair text-2xl md:text-3.5xl font-light text-[#2F3A2A] mt-2 text-[#9E4C41]">
                      {stats?.pendingOrders ?? 0}
                    </h2>
                    <p className="text-[10px] text-[#9E4C41] mt-1.5 font-semibold uppercase tracking-wider">Needs action</p>
                  </div>
                </div>

                {/* Sub Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Left Column: Low Stock Alerts */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs text-left">
                    <h3 className="font-playfair text-lg text-[#2F3A2A] font-semibold border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
                      <span>Inventory Alerts</span>
                      <span className="text-[10.5px] bg-[#FCECEB] text-[#9E4C41] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {stats?.lowStockCount ?? 0} Low Stock
                      </span>
                    </h3>
                    
                    {stats?.lowStockProducts && stats.lowStockProducts.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {stats.lowStockProducts.map((p) => (
                          <div key={p.id} className="flex justify-between items-center p-3.5 bg-[#FCECEB]/20 rounded-xl border border-[#FCECEB]">
                            <span className="text-xs font-semibold text-[#2F3A2A]">{p.title}</span>
                            <span className="text-xs font-bold text-[#9E4C41]">
                              Only {p.stock} left
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 font-light py-4 text-center">
                        All products have healthy stock counts.
                      </p>
                    )}
                  </div>

                  {/* Right Column: Bestsellers */}
                  <div className="bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs text-left">
                    <h3 className="font-playfair text-lg text-[#2F3A2A] font-semibold border-b border-gray-100 pb-3 mb-4">
                      Featured Bestsellers
                    </h3>
                    
                    {stats?.bestSellers && stats.bestSellers.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {stats.bestSellers.map((p) => (
                          <div key={p.id} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {p.cover_image ? (
                                <img src={p.cover_image} alt="" className="w-10 h-12 object-cover rounded-md border border-gray-100" />
                              ) : (
                                <div className="w-10 h-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400">Box</div>
                              )}
                              <div>
                                <h4 className="text-xs font-semibold text-[#2F3A2A]">{p.title}</h4>
                                <span className="text-[10px] text-gray-400">Stock: {p.stock}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#2F3A2A]">₹{Number(p.price).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 font-light py-4 text-center">
                        No bestseller products set.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* 3.2 ORDERS MANAGER TAB */}
        {activeTab === "Orders" && (
          <div className="bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs overflow-hidden">
            <h2 className="font-playfair text-xl text-[#2F3A2A] font-semibold border-b border-gray-100 pb-4 mb-6 text-left">
              Customer Orders Manager
            </h2>

            {loadingOrders ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-[#8E76B8] border-t-transparent animate-spin"></div>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-xs text-gray-400 font-light py-10 text-center">No customer orders have been recorded.</p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E7E3] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3.5 pl-2">Order No.</th>
                      <th className="pb-3.5">Customer</th>
                      <th className="pb-3.5">Date</th>
                      <th className="pb-3.5">Total</th>
                      <th className="pb-3.5">Payment</th>
                      <th className="pb-3.5">Shipping Status</th>
                      <th className="pb-3.5 pr-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-100 hover:bg-[#FAF9F6]/50">
                        <td className="py-4 pl-2 font-mono font-bold text-[#2F3A2A]">{o.order_number}</td>
                        <td className="py-4">
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-papiah-dark">
                              {o.users ? `${o.users.first_name} ${o.users.last_name}` : "Guest User"}
                            </span>
                            <span className="text-[10px] text-gray-400 mt-0.5">{o.users?.email}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-500">
                          {new Date(o.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                        <td className="py-4 font-bold text-[#2C2B29]">₹{Number(o.total).toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            o.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {o.payment_status}
                          </span>
                        </td>
                        <td className="py-4">
                          {updatingOrderId === o.id ? (
                            <div className="flex items-center gap-1.5">
                              <select 
                                value={statusVal} 
                                onChange={(e) => setStatusVal(e.target.value)}
                                className="px-2 py-1 text-xs border border-[#E8E7E3] rounded bg-white outline-none"
                              >
                                <option value="pending">pending</option>
                                <option value="processing">processing</option>
                                <option value="shipped">shipped</option>
                                <option value="delivered">delivered</option>
                                <option value="cancelled">cancelled</option>
                              </select>
                              <button 
                                onClick={() => handleUpdateOrderStatus(o.id)}
                                className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors"
                              >
                                Save
                              </button>
                              <button 
                                onClick={() => setUpdatingOrderId(null)}
                                className="text-gray-400 hover:text-[#2F3A2A] text-[10px] ml-1 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              o.order_status === "delivered" ? "bg-green-100 text-green-700" : 
                              o.order_status === "cancelled" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {o.order_status}
                            </span>
                          )}
                        </td>
                        <td className="py-4 pr-2 text-right">
                          {updatingOrderId !== o.id && (
                            <button
                              onClick={() => {
                                  setUpdatingOrderId(o.id);
                                  setStatusVal(o.order_status);
                              }}
                              className="text-[10px] font-bold tracking-widest text-[#8E76B8] hover:text-[#7D62A5] uppercase underline cursor-pointer"
                            >
                              Update Status
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3.3 PRODUCTS CATALOG TAB */}
        {activeTab === "Products" && (
          <div className="bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h2 className="font-playfair text-xl text-[#2F3A2A] font-semibold text-left">
                Inventory Products List
              </h2>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] text-[10px] font-bold tracking-widest px-5 py-2.5 rounded-xl uppercase transition-colors shadow-[0_4px_12px_rgba(203,216,59,0.15)] hover:shadow-[0_6px_18px_rgba(203,216,59,0.25)] cursor-pointer"
              >
                + Add New Product
              </button>
            </div>

            {loadingProducts ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-[#8E76B8] border-t-transparent animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-xs text-gray-400 font-light py-10 text-center">No products are recorded in the system.</p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E7E3] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3.5 pl-2">Product</th>
                      <th className="pb-3.5">SKU</th>
                      <th className="pb-3.5">Price</th>
                      <th className="pb-3.5">Compare Price</th>
                      <th className="pb-3.5">Stock</th>
                      <th className="pb-3.5">Status</th>
                      <th className="pb-3.5 pr-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-[#FAF9F6]/50">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-3 text-left">
                            {p.cover_image ? (
                              <img src={p.cover_image} alt="" className="w-10 h-12 object-cover rounded-lg border border-gray-100" />
                            ) : (
                              <div className="w-10 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[8px] text-gray-400">Blank</div>
                            )}
                            <div>
                              <span className="font-semibold text-papiah-dark block leading-snug">{p.title}</span>
                              <span className="text-[9.5px] text-gray-400 font-medium block mt-0.5 uppercase tracking-wide">
                                {p.categories?.name || "No Category"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 font-mono font-medium text-gray-500">{p.sku || "N/A"}</td>
                        <td className="py-3 font-bold text-[#2C2B29]">₹{Number(p.price).toLocaleString()}</td>
                        <td className="py-3 text-gray-400">
                          {p.compare_price ? `₹${Number(p.compare_price).toLocaleString()}` : "—"}
                        </td>
                        <td className="py-3">
                          <span className={`font-bold ${p.stock < 5 ? "text-[#9E4C41]" : "text-gray-600"}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            p.status === "active" ? "bg-green-50 text-green-700 border border-green-200/40" : "bg-gray-100 text-gray-600 border border-gray-200/50"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 pr-2 text-right">
                          <div className="flex items-center justify-end gap-3.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="text-[10px] font-bold tracking-widest text-[#8E76B8] hover:text-[#7D62A5] uppercase underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-[10px] font-bold tracking-widest text-[#9E4C41] hover:text-[#803C33] uppercase underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3.4 CUSTOMERS LIST TAB */}
        {activeTab === "Customers" && (
          <div className="bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs overflow-hidden">
            <h2 className="font-playfair text-xl text-[#2F3A2A] font-semibold border-b border-gray-100 pb-4 mb-6 text-left">
              Registered Customers
            </h2>

            {loadingCustomers ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-[#8E76B8] border-t-transparent animate-spin"></div>
              </div>
            ) : customers.length === 0 ? (
              <p className="text-xs text-gray-400 font-light py-10 text-center">No customers registered yet.</p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E7E3] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3.5 pl-2">Customer</th>
                      <th className="pb-3.5">Email</th>
                      <th className="pb-3.5">Phone</th>
                      <th className="pb-3.5">Reward Points</th>
                      <th className="pb-3.5 pr-2">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id} className="border-b border-gray-100 hover:bg-[#FAF9F6]/50">
                        <td className="py-4 pl-2 font-semibold text-papiah-dark text-left">
                          {c.first_name} {c.last_name}
                        </td>
                        <td className="py-4 text-gray-650">{c.email}</td>
                        <td className="py-4 text-gray-500 font-mono">{c.phone || "—"}</td>
                        <td className="py-4 font-bold text-[#8E76B8]">{c.reward_points} pts</td>
                        <td className="py-4 pr-2 text-gray-400">
                          {new Date(c.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ==================================================================== */}
      {/* 4. DIALOG MODALS */}
      {/* ==================================================================== */}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-white border border-[#E8E7E3] rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col p-6 animate-fade-in text-left">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-150 pb-3 mb-5">
              <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold">
                {editingProductId ? "Edit Product Details" : "Create New Product"}
              </h3>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-450 hover:text-papiah-dark text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {productFormError && (
              <div className="bg-[#FCECEB] border border-[#FCECEB] text-[#9E4C41] px-4 py-2.5 rounded-xl text-xs font-semibold mb-4 leading-normal">
                {productFormError}
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4 text-xs font-medium">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Title *</label>
                  <input 
                    type="text" 
                    value={productForm.title}
                    onChange={handleTitleChange}
                    placeholder="e.g., The Clarity Journal"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Slug (Auto-Generated) *</label>
                  <input 
                    type="text" 
                    value={productForm.slug}
                    onChange={(e) => setProductForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="the-clarity-journal"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-gray-50/70 text-gray-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Short Description (Sub-header)</label>
                <input 
                  type="text" 
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="For reflection, peace & inner clarity"
                  className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Content Description</label>
                <textarea 
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed layout parameters, feature highlights..."
                  className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6] resize-none"
                />
              </div>

              {/* Pricing & Stock Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* SKU */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SKU</label>
                  <input 
                    type="text" 
                    value={productForm.sku}
                    onChange={(e) => setProductForm(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="PAP-CLR-A5"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6] font-mono"
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price (INR) *</label>
                  <input 
                    type="number" 
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="699"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                    min="0"
                    required
                  />
                </div>

                {/* Compare Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Compare Price</label>
                  <input 
                    type="number" 
                    value={productForm.comparePrice}
                    onChange={(e) => setProductForm(prev => ({ ...prev, comparePrice: parseFloat(e.target.value) || 0 }))}
                    placeholder="999"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                    min="0"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stock Count *</label>
                  <input 
                    type="number" 
                    value={productForm.stock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    placeholder="20"
                    className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Categorization selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category ID select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Category</label>
                  <select 
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="px-4 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                  >
                    <option value="">No Category Selected</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Collection ID select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Design Collection</label>
                  <select 
                    value={productForm.collectionId}
                    onChange={(e) => setProductForm(prev => ({ ...prev, collectionId: e.target.value }))}
                    className="px-4 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                  >
                    <option value="">No Collection Selected</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image Selection */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Cover Image</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        imageInputMode === "upload" ? "bg-[#2F3A2A] text-white" : "bg-gray-100 text-gray-500 hover:text-papiah-dark"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        imageInputMode === "url" ? "bg-[#2F3A2A] text-white" : "bg-gray-100 text-gray-500 hover:text-papiah-dark"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {imageInputMode === "upload" ? (
                  <div 
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all flex flex-col items-center justify-center min-h-[140px] text-center cursor-pointer ${
                      dragActive ? "border-[#2F3A2A] bg-[#2F3A2A]/5" : "border-gray-200 bg-[#FAF9F6] hover:border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload-input")?.click()}
                  >
                    <input 
                      type="file" 
                      id="file-upload-input" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-[#8E76B8] border-t-transparent animate-spin"></div>
                        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Uploading file to Cloudinary...</span>
                      </div>
                    ) : productForm.coverImage ? (
                      <div className="relative group w-full flex items-center justify-between gap-4 p-2.5 bg-white rounded-lg border border-gray-150">
                        <div className="flex items-center gap-3">
                          <img 
                            src={productForm.coverImage} 
                            alt="Preview" 
                            className="w-12 h-14 object-cover rounded-md border border-gray-100"
                          />
                          <div className="text-left">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Uploaded Cover Image</span>
                            <span className="text-[10px] text-[#2F3A2A] font-mono break-all line-clamp-1 max-w-[250px] md:max-w-[350px]">
                              {productForm.coverImage}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductForm(prev => ({ ...prev, coverImage: "" }));
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                          <p className="text-xs font-semibold text-[#2F3A2A]">Drag & drop cover image here, or <span className="underline text-[#8E76B8]">browse files</span></p>
                          <p className="text-[10px] text-gray-400 mt-1">Supports JPEG, PNG, WEBP, SVG up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="text" 
                      value={productForm.coverImage}
                      onChange={(e) => setProductForm(prev => ({ ...prev, coverImage: e.target.value }))}
                      placeholder="e.g., https://images.unsplash.com/photo-..."
                      className="px-4.5 py-3 border border-[#E8E7E3] rounded-xl outline-none focus:border-[#2F3A2A] bg-[#FAF9F6]"
                    />
                    {productForm.coverImage && (
                      <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-150">
                        <img 
                          src={productForm.coverImage} 
                          alt="Preview" 
                          className="w-10 h-12 object-cover rounded-md border border-gray-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/100x120?text=Invalid+URL";
                          }}
                        />
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Image Preview</span>
                          <span className="text-[10px] text-gray-500 font-mono line-clamp-1 max-w-[300px]">{productForm.coverImage}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tags & Settings Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2.5 border-y border-gray-100">
                {/* status */}
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-gray-650 hover:text-papiah-dark select-none">
                  <input 
                    type="checkbox" 
                    checked={productForm.status === "active"}
                    onChange={(e) => setProductForm(prev => ({ ...prev, status: e.target.checked ? "active" : "draft" }))}
                    className="w-4 h-4 accent-[#2F3A2A] cursor-pointer"
                  />
                  <span>Publish (Active)</span>
                </label>

                {/* featured */}
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-gray-650 hover:text-papiah-dark select-none">
                  <input 
                    type="checkbox" 
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 accent-[#2F3A2A] cursor-pointer"
                  />
                  <span>Featured</span>
                </label>

                {/* bestseller */}
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-gray-650 hover:text-papiah-dark select-none">
                  <input 
                    type="checkbox" 
                    checked={productForm.isBestseller}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isBestseller: e.target.checked }))}
                    className="w-4 h-4 accent-[#2F3A2A] cursor-pointer"
                  />
                  <span>Bestseller</span>
                </label>

                {/* new */}
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-gray-650 hover:text-papiah-dark select-none">
                  <input 
                    type="checkbox" 
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isNew: e.target.checked }))}
                    className="w-4 h-4 accent-[#2F3A2A] cursor-pointer"
                  />
                  <span>Is New Arrival</span>
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 mt-4 border-t border-gray-150 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="border border-[#E8E7E3] hover:bg-gray-50 text-gray-500 font-sans font-bold tracking-widest px-6 py-3.5 rounded-xl uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={productSaving}
                  className="bg-[#CBD83B] hover:bg-[#b8c634] disabled:bg-gray-300 text-[#2E3327] font-sans font-bold tracking-widest px-8 py-3.5 rounded-xl uppercase transition-colors shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] cursor-pointer flex items-center gap-2"
                >
                  {productSaving ? "Saving..." : "Save Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <Footer />

    </div>
  );
}
