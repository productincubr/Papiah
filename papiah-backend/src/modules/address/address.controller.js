import * as addressService from "./address.service.js";

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await addressService.getAddresses(userId);
    return res.status(200).json(addresses);
  } catch (error) {
    console.error("Get addresses error:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch addresses" });
  }
};

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { label, full_name, phone, address_line1, address_line2, city, state, country, postal_code, is_default } = req.body;

    // Simple validation
    if (!full_name || !phone || !address_line1 || !city || !state || !postal_code) {
      return res.status(400).json({ error: "Missing required address fields (full_name, phone, address_line1, city, state, postal_code)" });
    }

    const newAddress = await addressService.createAddress(userId, {
      label,
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      country,
      postal_code,
      is_default
    });

    return res.status(201).json(newAddress);
  } catch (error) {
    console.error("Create address error:", error);
    return res.status(500).json({ error: error.message || "Failed to create address" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const addressData = req.body;

    const updated = await addressService.updateAddress(userId, addressId, addressData);
    return res.status(200).json(updated);
  } catch (error) {
    console.error("Update address error:", error);
    return res.status(500).json({ error: error.message || "Failed to update address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const result = await addressService.deleteAddress(userId, addressId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Delete address error:", error);
    return res.status(500).json({ error: error.message || "Failed to delete address" });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const updated = await addressService.setDefaultAddress(userId, addressId);
    return res.status(200).json(updated);
  } catch (error) {
    console.error("Set default address error:", error);
    return res.status(500).json({ error: error.message || "Failed to set default address" });
  }
};
