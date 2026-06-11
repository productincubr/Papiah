/**
 * Shipping / Delivery Service
 */

/**
 * Calculates the shipping cost based on the subtotal and shipping speed.
 * Rules:
 * - Free shipping above ₹999 for Standard shipping.
 * - Standard shipping: ₹49 (if subtotal < ₹999).
 * - Express shipping: ₹120.
 */
export const calculateShipping = (subtotal, speed = "standard") => {
  const normalizedSpeed = speed.toLowerCase();

  if (normalizedSpeed === "express") {
    return 120.00;
  }

  // Standard shipping rules
  if (subtotal >= 999.00) {
    return 0.00; // Free shipping
  }

  return 49.00;
};

/**
 * Estimates the delivery date range.
 * Standard: 3 to 5 business days.
 * Express: 1 to 2 business days.
 */
export const estimateDeliveryDate = (speed = "standard") => {
  const normalizedSpeed = speed.toLowerCase();
  const today = new Date();
  
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  };

  if (normalizedSpeed === "express") {
    return {
      minDate: addDays(today, 1),
      maxDate: addDays(today, 2),
      formatted: `${addDays(today, 1)} - ${addDays(today, 2)}`
    };
  }

  return {
    minDate: addDays(today, 3),
    maxDate: addDays(today, 5),
    formatted: `${addDays(today, 3)} - ${addDays(today, 5)}`
  };
};

/**
 * Generates tracking milestones based on the current order status.
 */
export const generateTrackingStatus = (orderStatus, trackingNumber = "") => {
  const milestones = [
    { status: "pending", label: "Order Placed", description: "Your order has been logged and is awaiting payment verification.", completed: false, date: null },
    { status: "processing", label: "Processing", description: "Your order is being picked and packed in our warehouse.", completed: false, date: null },
    { status: "shipped", label: "Shipped", description: `Your order has been shipped. ${trackingNumber ? `Tracking ID: ${trackingNumber}` : ""}`, completed: false, date: null },
    { status: "delivered", label: "Delivered", description: "Your order has been successfully delivered to your doorstep.", completed: false, date: null }
  ];

  const statusPriority = {
    "pending": 0,
    "processing": 1,
    "shipped": 2,
    "delivered": 3,
    "cancelled": -1
  };

  const currentPriority = statusPriority[orderStatus] || 0;

  if (orderStatus === "cancelled") {
    return [
      { status: "cancelled", label: "Cancelled", description: "Your order has been cancelled.", completed: true, date: new Date().toLocaleDateString("en-IN") }
    ];
  }

  return milestones.map((m, index) => {
    const isCompleted = index <= currentPriority;
    return {
      ...m,
      completed: isCompleted,
      date: isCompleted ? new Date().toLocaleDateString("en-IN") : null
    };
  });
};
