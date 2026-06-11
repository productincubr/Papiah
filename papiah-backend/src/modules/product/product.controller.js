import * as productService from "./product.service.js";

export const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Get All Products Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Product not found" });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By Slug Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Product not found" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getFeatured = async (req, res) => {
  try {
    const products = await productService.getFeaturedProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Featured Products Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const products = await productService.getBestSellerProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Bestseller Products Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getNew = async (req, res) => {
  try {
    const products = await productService.getNewProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Get New Products Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const query = async (req, res) => {
  try {
    const { search, category, collection, minPrice, maxPrice, isNew, isBestseller, isFeatured, sort } = req.query;
    const products = await productService.queryProducts({
      search,
      category,
      collection,
      minPrice,
      maxPrice,
      isNew: isNew !== undefined ? isNew === "true" : undefined,
      isBestseller: isBestseller !== undefined ? isBestseller === "true" : undefined,
      isFeatured: isFeatured !== undefined ? isFeatured === "true" : undefined,
      sort,
    });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Query Products Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const checkStockStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.query;
    const qty = parseInt(quantity) || 1;

    const status = await productService.checkStock(id, qty);
    return res.status(200).json(status);
  } catch (error) {
    console.error("Check Stock Status Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
