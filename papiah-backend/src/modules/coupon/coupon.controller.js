import * as couponService from "./coupon.service.js";

export const validate = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    if (!code || orderAmount === undefined) {
      return res.status(400).json({ error: "Coupon code and orderAmount are required" });
    }

    const validationResult = await couponService.validateCoupon(code, parseFloat(orderAmount));
    return res.status(200).json(validationResult);
  } catch (error) {
    console.error("Validate Coupon Error:", error);
    return res.status(400).json({ error: error.message || "Failed to validate coupon" });
  }
};

export const getAll = async (req, res) => {
  try {
    const coupons = await couponService.getAllCoupons();
    return res.status(200).json(coupons);
  } catch (error) {
    console.error("Get All Coupons Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const { code, type, value, minimumOrder, maxUses, expiresAt, isActive } = req.body;
    if (!code || !type || value === undefined) {
      return res.status(400).json({ error: "Coupon code, type, and value are required" });
    }

    const coupon = await couponService.createCoupon({
      code,
      type,
      value: parseFloat(value),
      minimumOrder: minimumOrder !== undefined ? parseFloat(minimumOrder) : undefined,
      maxUses: maxUses ? parseInt(maxUses) : undefined,
      expiresAt,
      isActive,
    });

    return res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.error("Create Coupon Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
