import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";

// Fallback placeholder assets if dynamic order products don't have images
import Product1 from "../assets/Product1.jpeg";

export default function ProfilePage() {
  const { user, token, logout, updateProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState("My Profile");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Profile summary dynamic states
  const [summaryData, setSummaryData] = useState<{
    orders: any[];
    addresses: any[];
    wishlistCount: number;
    rewardPoints: number;
  }>({
    orders: [],
    addresses: [],
    wishlistCount: 0,
    rewardPoints: 0,
  });

  const [loadingSummary, setLoadingSummary] = useState(true);

  // Rewards history state
  const [rewardsHistory, setRewardsHistory] = useState<any[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(false);
  const [redeemingPoints, setRedeemingPoints] = useState(false);
  const [redeemedCoupon, setRedeemedCoupon] = useState<any | null>(null);
  const [redeemError, setRedeemError] = useState("");

  // Orders tab states
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  // Edit Personal Information Form States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [infoError, setInfoError] = useState("");
  const [infoSuccess, setInfoSuccess] = useState("");
  const [infoSaving, setInfoSaving] = useState(false);

  // Add Address Form States
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [addressError, setAddressError] = useState("");
  const [addressSuccess, setAddressSuccess] = useState("");
  const [addressSaving, setAddressSaving] = useState(false);

  const API_URL = "http://localhost:3000/api";

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!token && !localStorage.getItem("papiah_token")) {
      window.history.pushState(null, "", "/login");
    }
  }, [token]);

  // Fetch Profile Summary on load
  const fetchProfileSummary = async () => {
    if (!token) return;
    try {
      setLoadingSummary(true);
      const response = await fetch(`${API_URL}/profile/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setSummaryData({
          orders: data.recentOrders || [],
          addresses: data.savedAddresses || [],
          wishlistCount: data.wishlistCount || 0,
          rewardPoints: data.rewardPoints || 0,
        });
      }
    } catch (err) {
      console.error("Failed to load profile summary:", err);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfileSummary();
    }
  }, [token]);

  const fetchRewardsHistory = async () => {
    if (!token) return;
    try {
      setLoadingRewards(true);
      const response = await fetch(`${API_URL}/profile/rewards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setRewardsHistory(data || []);
      }
    } catch (err) {
      console.error("Failed to load rewards history:", err);
    } finally {
      setLoadingRewards(false);
    }
  };

  const handleRedeemPoints = async (redeemType: string) => {
    if (!token) return;
    setRedeemError("");
    setRedeemedCoupon(null);
    setRedeemingPoints(true);
    try {
      const response = await fetch(`${API_URL}/profile/rewards/redeem`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redeemType }),
      });
      const data = await response.json();
      if (response.ok) {
        setRedeemedCoupon(data);
        // Refresh points balance and transactions
        fetchProfileSummary();
        fetchRewardsHistory();
      } else {
        setRedeemError(data.error || "Failed to redeem points.");
      }
    } catch (err: any) {
      setRedeemError(err.message || "Failed to connect to server.");
    } finally {
      setRedeemingPoints(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Rewards" && token) {
      fetchRewardsHistory();
    }
  }, [activeTab, token]);

  const fetchUserOrders = async () => {
    if (!token) return;
    try {
      setLoadingOrders(true);
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setOrdersList(data || []);
      }
    } catch (err) {
      console.error("Failed to load user orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    if (!token) return;
    try {
      setSelectedOrder(null);
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedOrder(data);
      }
    } catch (err) {
      console.error("Failed to load order details:", err);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    if (!token) return;
    try {
      setCancellingOrderId(orderId);
      const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Order cancelled successfully!");
        fetchUserOrders();
        fetchProfileSummary();
        if (selectedOrder && selectedOrder.id === orderId) {
          fetchOrderDetail(orderId);
        }
      } else {
        alert(data.error || "Failed to cancel order.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to connect to server.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  useEffect(() => {
    if (activeTab === "Orders" && token) {
      fetchUserOrders();
    }
  }, [activeTab, token]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/upload/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Failed to upload image.");
        return;
      }

      const result = await updateProfile({ avatar: data.url });
      if (result.success) {
        alert("Profile picture updated successfully!");
        fetchProfileSummary();
      } else {
        alert(result.error || "Failed to update profile picture.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to upload image.");
    }
  };

  // Populate info form when user changes or edit mode starts
  useEffect(() => {
    if (user) {
      setInfoForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
    }
  }, [user, isEditingInfo]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // 1. Log Out Handler
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
    }
  };

  // 2. Personal Info Update
  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoError("");
    setInfoSuccess("");
    setInfoSaving(true);

    const result = await updateProfile({
      firstName: infoForm.firstName,
      lastName: infoForm.lastName,
      phone: infoForm.phone,
    });
    
    setInfoSaving(false);

    if (result.success) {
      setInfoSuccess("Personal information updated successfully.");
      setIsEditingInfo(false);
      // Rerun summary fetch to update local states
      fetchProfileSummary();
    } else {
      setInfoError(result.error || "Failed to update profile.");
    }
  };

  // 3. Mark Default Address
  const handleSetDefaultAddress = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/addresses/${id}/default`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchProfileSummary();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to set default address");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Delete Address
  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const response = await fetch(`${API_URL}/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchProfileSummary();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete address");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Add Address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError("");
    setAddressSuccess("");
    setAddressSaving(true);

    try {
      const response = await fetch(`${API_URL}/addresses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: addressForm.label,
          full_name: addressForm.fullName,
          phone: addressForm.phone,
          address_line1: addressForm.addressLine1,
          address_line2: addressForm.addressLine2,
          city: addressForm.city,
          state: addressForm.state,
          postal_code: addressForm.postalCode,
        }),
      });

      const data = await response.json();
      setAddressSaving(false);

      if (response.ok) {
        setAddressSuccess("Address added successfully!");
        setIsAddingAddress(false);
        setAddressForm({
          label: "Home",
          fullName: "",
          phone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
        });
        fetchProfileSummary();
      } else {
        setAddressError(data.error || "Failed to add address.");
      }
    } catch (err: any) {
      setAddressSaving(false);
      setAddressError(err.message || "Failed to connect to server.");
    }
  };

  const baseMenuItems = [
    {
      name: "My Profile",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "Orders",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      name: "Addresses",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      name: "Wishlist",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: "Payment Methods",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      name: "Rewards",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    }
  ];

  if (user && user.role === "admin") {
    baseMenuItems.push({
      name: "Admin Portal",
      icon: (
        <svg className="w-4 h-4 text-[#8E76B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    });
  }

  baseMenuItems.push({
    name: "Log Out",
    icon: (
      <svg className="w-4 h-4 text-[#9E4C41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
  });

  const menuItems = baseMenuItems;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <span className="text-sm font-semibold text-[#2F3A2A]/60 tracking-widest uppercase">Loading Profile...</span>
      </div>
    );
  }

  // Generate Initials
  const initials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() || "U";
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User Profile";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19]">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#CBD83B] py-2.5 px-4 text-center z-50 relative select-none">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#2E3327] uppercase">
          FREE SHIPPING ON ORDERS OVER ₹775
        </span>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-12 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==========================================================
              LEFT SIDEBAR CARD
              ========================================================== */}
          <aside className="lg:col-span-3 bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-center">
            <div className="flex flex-col items-center mb-8">
              {/* Circular Avatar with Hover Upload */}
              <div className="relative group w-20 h-20 mb-4 mx-auto">
                <div className="w-20 h-20 rounded-full bg-[#F3ECFC] flex items-center justify-center border border-[#8E76B8]/10 shadow-sm overflow-hidden">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={fullName} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="font-playfair text-[#2F3A2A] text-2xl font-normal tracking-wide">
                      {initials}
                    </span>
                  )}
                </div>
                
                {/* Upload Hover Overlay */}
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute inset-0 bg-black/45 rounded-full flex flex-col items-center justify-center text-white text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-center select-none"
                >
                  <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Edit
                </label>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                />
              </div>
              <h2 className="font-playfair text-lg text-[#2F3A2A] font-semibold mb-1">
                {fullName}
              </h2>
              <p className="text-xs text-gray-500 font-light mb-3">
                {user.email}
              </p>
              <a 
                href="#profile-info" 
                onClick={(e) => { e.preventDefault(); setActiveTab("My Profile"); }}
                className="text-[11px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors underline underline-offset-4"
              >
                View Profile
              </a>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-1.5 text-left">
              {menuItems.map((item) => {
                const isActive = activeTab === item.name;
                const isLogout = item.name === "Log Out";
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isLogout) {
                        handleLogout();
                      } else if (item.name === "Admin Portal") {
                        window.history.pushState(null, "", "/admin");
                      } else if (item.name === "Wishlist") {
                        window.history.pushState(null, "", "/wishlist");
                      } else {
                        setActiveTab(item.name);
                      }
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#F0ECE3] text-[#2F3A2A]"
                        : isLogout
                        ? "text-[#9E4C41] hover:bg-red-50/50"
                        : "text-gray-600 hover:bg-[#FAF9F6] hover:text-[#2F3A2A]"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ==========================================================
              RIGHT CONTENT AREA
              ========================================================== */}
          <section className="lg:col-span-9 flex flex-col gap-8">
            
            <div className="text-left">
              <h1 className="font-playfair text-3xl md:text-4xl text-[#2F3A2A] font-light leading-tight tracking-tight mb-2">
                {activeTab}
              </h1>
              <p className="text-sm text-gray-500 font-light">
                {activeTab === "My Profile" 
                  ? "Manage your personal information and account preferences."
                  : `View and monitor your ${activeTab.toLowerCase()} status.`}
              </p>
            </div>

            {/* Dynamic Content Display */}
            {activeTab === "My Profile" && (
              <>
                {/* 1. PERSONAL INFORMATION CARD */}
                <div id="profile-info" className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(46,58,42,0.02)]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-playfair text-[18px] text-[#2F3A2A] font-semibold tracking-tight">
                      Personal Information
                    </h3>
                    <button 
                      onClick={() => {
                        setIsEditingInfo(!isEditingInfo);
                        setInfoError("");
                        setInfoSuccess("");
                      }}
                      className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
                    >
                      {isEditingInfo ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {infoError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 text-xs text-[#9E4C41] text-left">
                      {infoError}
                    </div>
                  )}

                  {infoSuccess && (
                    <div className="mb-4 p-3 rounded-lg bg-green-50 text-xs text-green-700 text-left">
                      {infoSuccess}
                    </div>
                  )}

                  {!isEditingInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                      {/* Full Name */}
                      <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Full Name</span>
                          <span className="text-sm font-medium text-[#2F3A2A]">{fullName}</span>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Email Address</span>
                          <span className="text-sm font-medium text-[#2F3A2A]">{user.email}</span>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Phone Number</span>
                          <span className="text-sm font-medium text-[#2F3A2A]">{user.phone || "Not set"}</span>
                        </div>
                      </div>

                      {/* Member Since */}
                      <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Member Since</span>
                          <span className="text-sm font-medium text-[#2F3A2A]">June 2024</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateInfo} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">First Name</label>
                        <input 
                          type="text" 
                          value={infoForm.firstName}
                          onChange={(e) => setInfoForm({ ...infoForm, firstName: e.target.value })}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Last Name</label>
                        <input 
                          type="text" 
                          value={infoForm.lastName}
                          onChange={(e) => setInfoForm({ ...infoForm, lastName: e.target.value })}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Phone Number</label>
                        <input 
                          type="text" 
                          value={infoForm.phone}
                          onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="md:col-span-2 pt-2">
                        <button 
                          type="submit" 
                          disabled={infoSaving}
                          className="bg-[#CBD83B] hover:bg-[#b8c634] disabled:opacity-50 text-[#2E3327] font-sans font-bold tracking-widest text-[10.5px] py-3 px-6 rounded-xl uppercase transition-colors shadow-[0_4px_12px_rgba(203,216,59,0.15)] hover:shadow-[0_6px_18px_rgba(203,216,59,0.25)]"
                        >
                          {infoSaving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* 2. SECOND ROW: TWO EQUAL CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Orders Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(46,58,42,0.02)] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-playfair text-[17px] text-[#2F3A2A] font-semibold tracking-tight">
                          Recent Orders
                        </h3>
                        <button 
                          onClick={() => setActiveTab("Orders")}
                          className="text-[10px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
                        >
                          View All
                        </button>
                      </div>

                      {loadingSummary ? (
                        <div className="text-xs text-gray-400 py-6">Loading orders...</div>
                      ) : summaryData.orders.length === 0 ? (
                        <div className="text-xs text-gray-400 py-8 text-center select-none font-light">No orders placed yet.</div>
                      ) : (
                        <div className="flex flex-col gap-5 mb-6">
                          {summaryData.orders.slice(0, 3).map((order) => {
                            const firstItem = order.order_items?.[0] || {};
                            return (
                              <div key={order.id} className="flex items-center gap-4">
                                <div className="w-12 h-16 rounded-lg bg-[#F8F6F1] flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
                                  <img 
                                    src={Product1} 
                                    alt={firstItem.product_title || "Journal"} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex-grow flex justify-between items-center text-left">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[12.5px] font-bold text-[#2F3A2A] line-clamp-1">
                                      {firstItem.product_title || "Intentional Journal"}
                                      {order.order_items?.length > 1 && ` + ${order.order_items.length - 1} more`}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-light">
                                      Order {order.order_number} • {new Date(order.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs font-semibold text-[#2F3A2A]">₹{order.total}</span>
                                    <span className="text-[9px] font-semibold bg-[#E6ECE0] text-[#3C4A33] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      {order.order_status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setActiveTab("Orders")}
                      className="w-full bg-transparent border border-[#E8E7E3] hover:bg-gray-50 active:scale-[0.99] text-[#2F3A2A] font-sans font-bold tracking-[0.15em] text-[10.5px] py-3.5 rounded-xl transition-all uppercase cursor-pointer"
                    >
                      VIEW ALL ORDERS
                    </button>
                  </div>

                  {/* Saved Addresses Card */}
                  <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(46,58,42,0.02)] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-playfair text-[17px] text-[#2F3A2A] font-semibold tracking-tight">
                          Saved Addresses
                        </h3>
                        <button 
                          onClick={() => {
                            setIsAddingAddress(!isAddingAddress);
                            setAddressError("");
                            setAddressSuccess("");
                          }}
                          className="text-[10px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
                        >
                          {isAddingAddress ? "Cancel" : "Manage"}
                        </button>
                      </div>

                      {addressError && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-xs text-[#9E4C41] text-left">
                          {addressError}
                        </div>
                      )}

                      {addressSuccess && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 text-xs text-green-700 text-left">
                          {addressSuccess}
                        </div>
                      )}

                      {isAddingAddress ? (
                        <form onSubmit={handleAddAddress} className="flex flex-col gap-3.5 text-left mb-6">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">Label</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Home, Work"
                                value={addressForm.label}
                                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">Full Name</label>
                              <input 
                                type="text" 
                                required
                                value={addressForm.fullName}
                                onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">Phone</label>
                              <input 
                                type="text" 
                                required
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">Pincode</label>
                              <input 
                                type="text" 
                                required
                                value={addressForm.postalCode}
                                onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Address Line 1</label>
                            <input 
                              type="text" 
                              required
                              value={addressForm.addressLine1}
                              onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                              className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">City</label>
                              <input 
                                type="text" 
                                required
                                value={addressForm.city}
                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-gray-400 uppercase">State</label>
                              <input 
                                type="text" 
                                required
                                value={addressForm.state}
                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF9F6] outline-none"
                              />
                            </div>
                          </div>
                          <button 
                            type="submit" 
                            disabled={addressSaving}
                            className="bg-[#CBD83B] hover:bg-[#b8c634] disabled:opacity-50 text-[#2E3327] font-sans font-bold tracking-widest text-[10px] py-2.5 rounded-xl uppercase transition-colors shadow-[0_4px_12px_rgba(203,216,59,0.15)] hover:shadow-[0_6px_18px_rgba(203,216,59,0.25)]"
                          >
                            {addressSaving ? "Saving..." : "Add Address"}
                          </button>
                        </form>
                      ) : (
                        <div className="flex flex-col gap-4 mb-6 text-left max-h-[290px] overflow-y-auto pr-1">
                          {loadingSummary ? (
                            <div className="text-xs text-gray-400 py-6">Loading addresses...</div>
                          ) : summaryData.addresses.length === 0 ? (
                            <div className="text-xs text-gray-400 py-8 text-center select-none font-light">No saved addresses.</div>
                          ) : (
                            summaryData.addresses.map((address) => (
                              <div key={address.id} className="relative p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                                  {address.label.toLowerCase() === "work" ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-grow flex flex-col gap-1 pr-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#2F3A2A]">{address.label}</span>
                                    {address.is_default && (
                                      <span className="text-[9px] font-semibold bg-[#E6ECE0] text-[#3C4A33] px-1.5 py-0.5 rounded-sm uppercase tracking-wider scale-90 origin-left">Default</span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                                    <strong>{address.full_name}</strong> • {address.phone}<br />
                                    {address.address_line1} {address.address_line2 && `, ${address.address_line2}`}<br />
                                    {address.city}, {address.state} {address.postal_code}<br />
                                    {address.country}
                                  </p>
                                  {!address.is_default && (
                                    <button 
                                      onClick={() => handleSetDefaultAddress(address.id)}
                                      className="text-[9.5px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors text-left mt-1 underline"
                                    >
                                      Make Default
                                    </button>
                                  )}
                                </div>
                                <button 
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="text-gray-400 hover:text-red-600 p-0.5 absolute top-3 right-3 cursor-pointer"
                                  title="Delete address"
                                >
                                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    {!isAddingAddress && (
                      <button 
                        onClick={() => setIsAddingAddress(true)}
                        className="w-full bg-transparent border border-[#E8E7E3] hover:bg-gray-50 active:scale-[0.99] text-[#2F3A2A] font-sans font-bold tracking-[0.15em] text-[10.5px] py-3.5 rounded-xl transition-all uppercase cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>+ ADD NEW ADDRESS</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. REWARDS CARD (FULL-WIDTH) */}
                <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(46,58,42,0.02)] flex flex-col md:flex-row md:items-center gap-8 justify-between">
                  <div className="flex-grow flex flex-col md:flex-row items-center gap-6 text-left">
                    <div className="w-28 h-28 rounded-full bg-[#FAF9F6] border border-[#2F3A2A]/5 shadow-xs flex flex-col items-center justify-center text-center p-4 shrink-0">
                      <svg className="w-5 h-5 text-[#8E76B8] mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="font-playfair text-2xl font-bold text-[#2F3A2A]">
                        {loadingSummary ? "..." : summaryData.rewardPoints}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">Papiah Points</span>
                    </div>

                    <div className="flex-grow text-center md:text-left w-full">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-playfair text-[16.5px] text-[#2F3A2A] font-semibold">Papiah Rewards</h4>
                        <button 
                          onClick={() => setActiveTab("Rewards")}
                          className="text-[10px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
                        >
                          View Rewards
                        </button>
                      </div>
                      
                      {summaryData.rewardPoints >= 500 ? (
                        <p className="text-[12.5px] text-[#2F3A2A]/85 font-light mb-4">
                          You've unlocked a <strong className="font-semibold text-green-700">₹100 discount coupon</strong>! Check your rewards panel to redeem it.
                        </p>
                      ) : (
                        <p className="text-[12.5px] text-[#2F3A2A]/85 font-light mb-4">
                          You're just <strong className="font-semibold text-[#8E76B8]">{500 - summaryData.rewardPoints} points</strong> away from <strong className="font-semibold">₹100 off</strong> your next order!
                        </p>
                      )}
                      
                      {/* Bar indicator */}
                      <div className="w-full bg-[#FAF9F6] border border-gray-100 rounded-full h-3.5 p-0.5 overflow-hidden">
                        <div 
                          className="bg-[#2D3F28] h-full rounded-full transition-all duration-500 shadow-sm" 
                          style={{ width: `${Math.min(100, (summaryData.rewardPoints / 500) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-400 mt-1.5 uppercase tracking-wider">
                        <span>{summaryData.rewardPoints} points</span>
                        <span>500 points</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-[1px] h-20 bg-gray-100 mx-4 shrink-0"></div>

                  <div className="flex flex-col gap-4 text-left md:max-w-xs shrink-0 w-full">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#E6ECE0] flex items-center justify-center text-[#3C4A33] shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11.5px] font-bold text-[#2F3A2A]">Earn points on every purchase</span>
                        <span className="text-[10px] text-gray-500 font-light">1 Point for every ₹1 spent</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#F3ECFC] flex items-center justify-center text-[#8E76B8] shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.727l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11.5px] font-bold text-[#2F3A2A]">Special birthday reward</span>
                        <span className="text-[10px] text-gray-500 font-light">You'll get 100 bonus points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Rewards Tab */}
            {activeTab === "Rewards" && (
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-left flex flex-col gap-8">
                
                {/* Points balance and header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#F3ECFC] flex items-center justify-center text-[#8E76B8] shrink-0">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-playfair text-2xl text-[#2F3A2A] font-bold">
                        {summaryData.rewardPoints} Points
                      </h3>
                      <p className="text-xs text-gray-500 font-light">Your current redeemable balance</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-light">
                    1 Point earned for every ₹1 spent on shop.
                  </div>
                </div>

                {/* Redeem Rewards Options */}
                <div>
                  <h4 className="font-playfair text-lg text-[#2F3A2A] font-semibold mb-4">Redeem for Coupons</h4>
                  
                  {redeemError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 text-xs text-[#9E4C41]">
                      {redeemError}
                    </div>
                  )}

                  {redeemedCoupon && (
                    <div className="mb-6 p-5 rounded-2xl bg-green-50 border border-green-100 text-[#2F3A2A]">
                      <h5 className="font-semibold text-sm text-green-800 mb-1">Coupon Redeemed Successfully!</h5>
                      <p className="text-xs text-gray-600 mb-4">
                        Use this code at checkout to get ₹{redeemedCoupon.couponValue} off (Min order: ₹{redeemedCoupon.couponValue === 100 ? 300 : redeemedCoupon.couponValue === 250 ? 600 : 1200}).
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-mono bg-white border border-green-200 px-4 py-2.5 rounded-lg text-sm font-bold text-green-900 tracking-wider">
                          {redeemedCoupon.couponCode}
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(redeemedCoupon.couponCode);
                            alert("Coupon code copied to clipboard!");
                          }}
                          className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
                        >
                          Copy Code
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-400 font-light mt-2 block">Expires in 30 days</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Reward 100 */}
                    <div className="border border-gray-100 rounded-2xl p-5 flex flex-col justify-between items-start bg-gray-50/50">
                      <div>
                        <span className="text-[10px] font-bold text-[#8E76B8] tracking-widest uppercase mb-1 block">500 POINTS</span>
                        <h5 className="font-playfair text-base font-bold text-[#2F3A2A] mb-1">₹100 Off Coupon</h5>
                        <p className="text-xs text-gray-500 font-light mb-4">Minimum order value: ₹300</p>
                      </div>
                      <button 
                        onClick={() => handleRedeemPoints("100_coupon")}
                        disabled={redeemingPoints || summaryData.rewardPoints < 500}
                        className="w-full bg-[#2D3F28] hover:bg-[#1C2518] disabled:opacity-50 text-white font-sans font-bold tracking-widest text-[9.5px] py-2.5 rounded-xl uppercase transition-colors cursor-pointer"
                      >
                        REDEEM FOR 500 PTS
                      </button>
                    </div>

                    {/* Reward 250 */}
                    <div className="border border-gray-100 rounded-2xl p-5 flex flex-col justify-between items-start bg-gray-50/50">
                      <div>
                        <span className="text-[10px] font-bold text-[#8E76B8] tracking-widest uppercase mb-1 block">1000 POINTS</span>
                        <h5 className="font-playfair text-base font-bold text-[#2F3A2A] mb-1">₹250 Off Coupon</h5>
                        <p className="text-xs text-gray-500 font-light mb-4">Minimum order value: ₹600</p>
                      </div>
                      <button 
                        onClick={() => handleRedeemPoints("250_coupon")}
                        disabled={redeemingPoints || summaryData.rewardPoints < 1000}
                        className="w-full bg-[#2D3F28] hover:bg-[#1C2518] disabled:opacity-50 text-white font-sans font-bold tracking-widest text-[9.5px] py-2.5 rounded-xl uppercase transition-colors cursor-pointer"
                      >
                        REDEEM FOR 1000 PTS
                      </button>
                    </div>

                    {/* Reward 500 */}
                    <div className="border border-gray-100 rounded-2xl p-5 flex flex-col justify-between items-start bg-gray-50/50">
                      <div>
                        <span className="text-[10px] font-bold text-[#8E76B8] tracking-widest uppercase mb-1 block">1800 POINTS</span>
                        <h5 className="font-playfair text-base font-bold text-[#2F3A2A] mb-1">₹500 Off Coupon</h5>
                        <p className="text-xs text-gray-500 font-light mb-4">Minimum order value: ₹1200</p>
                      </div>
                      <button 
                        onClick={() => handleRedeemPoints("500_coupon")}
                        disabled={redeemingPoints || summaryData.rewardPoints < 1800}
                        className="w-full bg-[#2D3F28] hover:bg-[#1C2518] disabled:opacity-50 text-white font-sans font-bold tracking-widest text-[9.5px] py-2.5 rounded-xl uppercase transition-colors cursor-pointer"
                      >
                        REDEEM FOR 1800 PTS
                      </button>
                    </div>
                  </div>
                </div>

                {/* Points Transactions History */}
                <div>
                  <h4 className="font-playfair text-lg text-[#2F3A2A] font-semibold mb-4">Points Transaction History</h4>
                  
                  {loadingRewards ? (
                    <div className="text-xs text-gray-400 py-6">Loading points history...</div>
                  ) : rewardsHistory.length === 0 ? (
                    <div className="text-xs text-gray-400 py-8 text-center select-none font-light">No reward transactions yet. Earn points by placing orders!</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-sans">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-400 font-semibold tracking-wider uppercase text-[10px] text-left">
                            <th className="py-3 text-left">Date</th>
                            <th className="py-3 text-left">Description</th>
                            <th className="py-3 text-left">Type</th>
                            <th className="py-3 text-right pr-4">Points</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {rewardsHistory.map((tx: any) => (
                            <tr key={tx.id} className="text-[#2F3A2A]">
                              <td className="py-3.5 font-light">{new Date(tx.created_at).toLocaleDateString("en-IN")}</td>
                              <td className="py-3.5 font-medium text-left">
                                {tx.type === "earned" 
                                  ? `Points earned on purchase` 
                                  : `Points redeemed for coupon`}
                                {tx.reference_id && <span className="text-[10px] text-gray-400 block font-normal">{tx.reference_id}</span>}
                              </td>
                              <td className="py-3.5 font-semibold text-left">
                                <span className={`px-2 py-0.5 rounded-full uppercase text-[9px] tracking-wider ${
                                  tx.type === "earned" 
                                    ? "bg-green-50 text-green-700" 
                                    : "bg-red-50 text-[#9E4C41]"
                                }`}>
                                  {tx.type}
                                </span>
                              </td>
                              <td className={`py-3.5 text-right pr-4 font-bold ${tx.points > 0 ? "text-green-700" : "text-[#9E4C41]"}`}>
                                {tx.points > 0 ? `+${tx.points}` : tx.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={() => setActiveTab("My Profile")}
                    className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to Profile
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "Addresses" && (
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-left flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold tracking-tight">
                    Manage Saved Addresses
                  </h3>
                  {!isAddingAddress && (
                    <button 
                      onClick={() => {
                        setIsAddingAddress(true);
                        setAddressError("");
                        setAddressSuccess("");
                      }}
                      className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      + Add New Address
                    </button>
                  )}
                  {isAddingAddress && (
                    <button 
                      onClick={() => {
                        setIsAddingAddress(false);
                        setAddressError("");
                        setAddressSuccess("");
                      }}
                      className="text-xs font-bold text-[#9E4C41] hover:text-red-700 tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {addressError && (
                  <div className="p-3 rounded-lg bg-red-50 text-xs text-[#9E4C41]">
                    {addressError}
                  </div>
                )}

                {addressSuccess && (
                  <div className="p-3 rounded-lg bg-green-50 text-xs text-green-700">
                    {addressSuccess}
                  </div>
                )}

                {isAddingAddress ? (
                  <form onSubmit={handleAddAddress} className="flex flex-col gap-4 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Address Type (Label)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Home, Work"
                          value={addressForm.label}
                          onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Receiver's Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Contact Phone Number</label>
                        <input 
                          type="text" 
                          required
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Postal Code (Pincode)</label>
                        <input 
                          type="text" 
                          required
                          value={addressForm.postalCode}
                          onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Address Line 1</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Street address, P.O. Box, Company name"
                        value={addressForm.addressLine1}
                        onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Address Line 2 (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        value={addressForm.addressLine2}
                        onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">City</label>
                        <input 
                          type="text" 
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">State</label>
                        <input 
                          type="text" 
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs bg-[#FAF9F6] outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8]"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={addressSaving}
                        className="bg-[#CBD83B] hover:bg-[#b8c634] disabled:opacity-50 text-[#2E3327] font-sans font-bold tracking-widest text-[10.5px] py-3.5 px-8 rounded-xl uppercase transition-colors shadow-[0_4px_12px_rgba(203,216,59,0.15)] hover:shadow-[0_6px_18px_rgba(203,216,59,0.25)] cursor-pointer"
                      >
                        {addressSaving ? "Saving..." : "Add Address"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loadingSummary ? (
                      <div className="text-xs text-gray-400 col-span-2 py-6">Loading addresses...</div>
                    ) : summaryData.addresses.length === 0 ? (
                      <div className="text-xs text-gray-400 col-span-2 py-12 text-center select-none font-light">
                        No saved addresses found. Please add a new shipping address.
                      </div>
                    ) : (
                      summaryData.addresses.map((address: any) => (
                        <div key={address.id} className="relative p-5 rounded-2xl border border-gray-150 flex items-start gap-4 hover:border-gray-300 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center text-[#2F3A2A]/70 shrink-0">
                            {address.label.toLowerCase() === "work" ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-grow flex flex-col gap-1 pr-6 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#2F3A2A]">{address.label}</span>
                              {address.is_default && (
                                <span className="text-[9px] font-semibold bg-[#E6ECE0] text-[#3C4A33] px-2 py-0.5 rounded-sm uppercase tracking-wider">Default</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-light leading-relaxed">
                              <strong className="font-semibold">{address.full_name}</strong><br />
                              Phone: {address.phone}<br />
                              {address.address_line1} {address.address_line2 && `, ${address.address_line2}`}<br />
                              {address.city}, {address.state} {address.postal_code}<br />
                              {address.country}
                            </p>
                            {!address.is_default && (
                              <button 
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="text-[10px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors text-left mt-2 underline"
                              >
                                Make Default Address
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-gray-400 hover:text-red-600 p-1 absolute top-4 right-4 cursor-pointer"
                            title="Delete address"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={() => setActiveTab("My Profile")}
                    className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to Profile
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "Orders" && (
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-left flex flex-col gap-8">
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold tracking-tight">
                    Your Order History
                  </h3>
                  {selectedOrder && (
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      ← Back to List
                    </button>
                  )}
                </div>

                {selectedOrder ? (
                  // Detailed Order View
                  <div className="flex flex-col gap-6">
                    {/* Order Details Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Order Number</span>
                        <span className="text-sm font-semibold text-[#2F3A2A] font-mono">{selectedOrder.order_number}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Placed On</span>
                        <span className="text-sm font-semibold text-[#2F3A2A]">{new Date(selectedOrder.created_at).toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Total Amount</span>
                        <span className="text-sm font-semibold text-[#2F3A2A]">₹{selectedOrder.total}</span>
                      </div>
                    </div>

                    {/* Delivery & Tracking Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tracking timeline */}
                      <div className="border border-gray-100 rounded-2xl p-5">
                        <h4 className="font-playfair text-base font-semibold text-[#2F3A2A] mb-4">Tracking Progress</h4>
                        <div className="relative pl-6 border-l-2 border-gray-100 space-y-6">
                          {selectedOrder.tracking_timeline?.map((milestone: any, index: number) => (
                            <div key={index} className="relative text-left">
                              {/* Dot marker */}
                              <div className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                                milestone.completed 
                                  ? "bg-[#2D3F28] border-[#2D3F28]" 
                                  : "bg-white border-gray-200"
                              }`}>
                                {milestone.completed && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div className="text-left">
                                <h5 className={`text-xs font-bold ${milestone.completed ? "text-[#2D3F28]" : "text-gray-400"}`}>
                                  {milestone.label}
                                </h5>
                                <p className="text-[11px] text-gray-500 font-light mt-0.5">{milestone.description}</p>
                                {milestone.date && (
                                  <span className="text-[9px] text-gray-400 font-medium block mt-1">{milestone.date}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary details */}
                      <div className="border border-gray-100 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="text-left space-y-4">
                          <h4 className="font-playfair text-base font-semibold text-[#2F3A2A]">Shipping & Payment</h4>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Estimated Delivery</span>
                            <p className="text-xs text-[#2D3F28] font-semibold mt-0.5">
                              {selectedOrder.estimated_delivery?.formatted || "Pending shipment"}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Shipping Address</span>
                            {selectedOrder.addresses ? (
                              <p className="text-xs text-gray-500 font-light mt-1 leading-relaxed">
                                <strong>{selectedOrder.addresses.full_name}</strong> • {selectedOrder.addresses.phone}<br />
                                {selectedOrder.addresses.address_line1} {selectedOrder.addresses.address_line2 && `, ${selectedOrder.addresses.address_line2}`}<br />
                                {selectedOrder.addresses.city}, {selectedOrder.addresses.state} {selectedOrder.addresses.postal_code}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-400 font-light mt-1">No shipping address record found.</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Payment Method</span>
                              <span className="text-xs font-medium text-[#2F3A2A] block mt-0.5">{selectedOrder.payment_method || "Razorpay"}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Payment Status</span>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider block mt-1 w-fit ${
                                selectedOrder.payment_status === "paid" 
                                  ? "bg-green-50 text-green-700" 
                                  : "bg-amber-50 text-amber-700"
                              }`}>
                                {selectedOrder.payment_status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions: Cancel order */}
                        {(selectedOrder.order_status === "pending" || selectedOrder.order_status === "processing") && (
                          <button
                            onClick={() => handleCancelOrder(selectedOrder.id)}
                            disabled={cancellingOrderId === selectedOrder.id}
                            className="w-full mt-6 bg-transparent border border-red-200 hover:bg-red-50 text-[#9E4C41] font-sans font-bold tracking-widest text-[10px] py-3.5 rounded-xl uppercase transition-colors cursor-pointer"
                          >
                            {cancellingOrderId === selectedOrder.id ? "CANCELLING..." : "CANCEL THIS ORDER"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border border-gray-100 rounded-2xl p-5 text-left">
                      <h4 className="font-playfair text-base font-semibold text-[#2F3A2A] mb-4">Ordered Items</h4>
                      <div className="divide-y divide-gray-100">
                        {selectedOrder.order_items?.map((item: any) => (
                          <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                            <div className="flex flex-col text-left">
                              <span className="font-semibold text-[#2F3A2A]">{item.product_title}</span>
                              <span className="text-gray-400 font-light mt-0.5">Qty: {item.quantity} • Price: ₹{item.product_price}</span>
                            </div>
                            <span className="font-bold text-[#2F3A2A]">₹{item.total}</span>
                          </div>
                        ))}
                      </div>

                      {/* Totals Summary */}
                      <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-xs">
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>Subtotal</span>
                          <span>₹{selectedOrder.subtotal}</span>
                        </div>
                        {selectedOrder.discount > 0 && (
                          <div className="flex justify-between text-green-700">
                            <span>Discount Coupon</span>
                            <span>-₹{selectedOrder.discount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>Shipping Fee</span>
                          <span>{selectedOrder.shipping > 0 ? `₹${selectedOrder.shipping}` : "Free"}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>Tax (GST 18%)</span>
                          <span>₹{selectedOrder.tax}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-[#2D3F28] pt-2 border-t border-gray-50">
                          <span>Grand Total</span>
                          <span>₹{selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5 self-start"
                    >
                      ← Back to Order History
                    </button>
                  </div>
                ) : (
                  // List of Orders
                  <div className="overflow-x-auto">
                    {loadingOrders ? (
                      <div className="text-xs text-gray-400 py-6">Loading your orders...</div>
                    ) : ordersList.length === 0 ? (
                      <div className="text-xs text-gray-400 py-12 text-center select-none font-light">
                        No orders placed yet. Explore the shop and buy our premium journals!
                      </div>
                    ) : (
                      <table className="w-full text-xs font-sans text-left">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-400 font-semibold tracking-wider uppercase text-[10px] text-left">
                            <th className="py-3">Order ID</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Payment</th>
                            <th className="py-3 text-right">Total</th>
                            <th className="py-3 text-right pr-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {ordersList.map((order) => (
                            <tr key={order.id} className="text-[#2F3A2A]">
                              <td className="py-4 font-mono font-semibold">{order.order_number}</td>
                              <td className="py-4 font-light">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                              <td className="py-4 text-left">
                                <span className={`px-2.5 py-0.5 rounded-full uppercase text-[9px] font-bold tracking-wider ${
                                  order.order_status === "delivered" 
                                    ? "bg-green-50 text-green-700" 
                                    : order.order_status === "cancelled"
                                    ? "bg-red-50 text-[#9E4C41]"
                                    : "bg-[#E6ECE0] text-[#3C4A33]"
                                }`}>
                                  {order.order_status}
                                </span>
                              </td>
                              <td className="py-4 text-left">
                                <span className={`px-2 py-0.5 rounded-full uppercase text-[9px] font-bold tracking-wider ${
                                  order.payment_status === "paid" 
                                    ? "bg-green-50 text-green-700" 
                                    : "bg-amber-50 text-amber-700"
                                }`}>
                                  {order.payment_status}
                                </span>
                              </td>
                              <td className="py-4 text-right font-bold">₹{order.total}</td>
                              <td className="py-4 text-right pr-4 space-x-2">
                                <button
                                  onClick={() => fetchOrderDetail(order.id)}
                                  className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors cursor-pointer"
                                >
                                  View Details
                                </button>
                                {(order.order_status === "pending" || order.order_status === "processing") && (
                                  <button
                                    onClick={() => handleCancelOrder(order.id)}
                                    disabled={cancellingOrderId === order.id}
                                    className="text-xs font-bold text-[#9E4C41] hover:text-red-700 tracking-widest uppercase transition-colors cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {!selectedOrder && (
                  <div className="border-t border-gray-100 pt-6">
                    <button
                      onClick={() => setActiveTab("My Profile")}
                      className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      Back to Profile
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* Payment Methods Tab (Coming Soon) */}
            {activeTab === "Payment Methods" && (
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-12 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-center min-h-[400px] flex flex-col justify-center items-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center text-[#2F3A2A]/70 mb-4 shadow-3xs">
                  {menuItems.find((item) => item.name === activeTab)?.icon}
                </div>
                <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold mb-2">Payment Methods</h3>
                
                {/* Coming Soon Badge */}
                <span className="text-[10px] font-bold bg-[#EAD9FA] text-[#8E76B8] px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                  Coming Soon
                </span>
                
                <p className="text-xs text-gray-500 font-light max-w-xs leading-relaxed mb-6">
                  We are currently integrating secure card saving, UPI aliases, and wallet options. In the meantime, you can securely pay during checkout using our Razorpay integration.
                </p>
                
                <button
                  onClick={() => setActiveTab("My Profile")}
                  className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Back to Profile
                </button>
              </div>
            )}

            {/* Simple fallbacks for other tabs */}
            {activeTab !== "My Profile" && activeTab !== "Rewards" && activeTab !== "Addresses" && activeTab !== "Orders" && activeTab !== "Payment Methods" && (
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-12 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-center min-h-[400px] flex flex-col justify-center items-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center text-[#2F3A2A]/70 mb-4 shadow-3xs">
                  {menuItems.find((item) => item.name === activeTab)?.icon}
                </div>
                <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold mb-2">{activeTab}</h3>
                <p className="text-xs text-gray-500 font-light max-w-xs">
                  Your {activeTab.toLowerCase()} information, logs, and settings will appear here in your live dashboard.
                </p>
                <button
                  onClick={() => setActiveTab("My Profile")}
                  className="mt-6 text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Back to Profile
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Newsletter Section */}
      <section className="w-full relative z-10 px-4 md:px-10 lg:px-12 py-16 md:py-20 bg-gradient-to-r from-[#2F3A2A] to-[#1C2518] rounded-none md:rounded-[2rem] max-w-7xl mx-auto mb-16 shadow-[0_16px_40px_rgba(47,58,42,0.12)]">
        <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#FAF9F6] mb-3 tracking-tight">Be the first to know</h2>
          <p className="text-[14px] text-[#FAF9F6]/80 font-sans font-light leading-relaxed mb-8 max-w-md">
            Get early access to new collections, exclusive offers, and mindful inspiration.
          </p>

          {subscribed ? (
            <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase animate-fade-in">
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-5 py-4.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:bg-white/15 transition-all"
              />
              
              <button
                type="submit"
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
