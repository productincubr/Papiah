import * as categoryService from "./category.service.js";

export const create = async (req, res) => {
  try {
    const { name, slug, description, image, parentCategoryId, isActive } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: "Category name and slug are required" });
    }

    const category = await categoryService.createCategory({
      name,
      slug,
      description,
      image,
      parentCategoryId,
      isActive,
    });

    return res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryService.getCategoryBySlug(slug);
    return res.status(200).json(category);
  } catch (error) {
    console.error("Get Category By Slug Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Category not found" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    return res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
