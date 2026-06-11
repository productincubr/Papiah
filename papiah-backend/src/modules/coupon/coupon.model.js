/**
 * Coupon Model Schema Representation
 * Database Table: public.coupons
 * 
 * Fields:
 * - id (UUID, PK)
 * - code (TEXT, UNIQUE, NOT NULL)
 * - type (TEXT, CHECK IN ('percentage', 'fixed'), NOT NULL)
 * - value (NUMERIC, NOT NULL)
 * - minimum_order (NUMERIC, DEFAULT 0)
 * - max_uses (INTEGER, NULL)
 * - used_count (INTEGER, DEFAULT 0)
 * - expires_at (TIMESTAMP WITH TIME ZONE, NULL)
 * - is_active (BOOLEAN, DEFAULT TRUE)
 */

export const CouponSchema = {
  id: "uuid",
  code: "string",
  type: "string", // 'percentage', 'fixed'
  value: "number",
  minimumOrder: "number",
  maxUses: "number?",
  usedCount: "number",
  expiresAt: "date?",
  isActive: "boolean",
};
