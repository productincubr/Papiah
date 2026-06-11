/**
 * Address Model Schema Representation
 * Database Table: public.addresses
 * 
 * Fields:
 * - id (UUID, PK)
 * - user_id (UUID, REFERENCES users.id, NOT NULL)
 * - label (TEXT, NOT NULL DEFAULT 'Home')
 * - full_name (TEXT, NOT NULL)
 * - phone (TEXT, NOT NULL)
 * - address_line1 (TEXT, NOT NULL)
 * - address_line2 (TEXT, NULL)
 * - city (TEXT, NOT NULL)
 * - state (TEXT, NOT NULL)
 * - country (TEXT, NOT NULL DEFAULT 'India')
 * - postal_code (TEXT, NOT NULL)
 * - is_default (BOOLEAN, NOT NULL DEFAULT FALSE)
 * - created_at (TIMESTAMP, NOT NULL)
 */

export const AddressSchema = {
  id: "uuid",
  userId: "uuid",
  label: "string", // 'Home', 'Work', etc.
  fullName: "string",
  phone: "string",
  addressLine1: "string",
  addressLine2: "string?",
  city: "string",
  state: "string",
  country: "string",
  postalCode: "string",
  isDefault: "boolean",
  createdAt: "date",
};
