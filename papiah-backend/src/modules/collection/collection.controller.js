import * as collectionService from "./collection.service.js";

export const create = async (req, res) => {
  try {
    const { name, slug, description, heroImage, accentColor, orderIndex, isFeatured } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: "Collection name and slug are required" });
    }

    const collection = await collectionService.createCollection({
      name,
      slug,
      description,
      heroImage,
      accentColor,
      orderIndex,
      isFeatured,
    });

    return res.status(201).json({ message: "Collection created successfully", collection });
  } catch (error) {
    console.error("Create Collection Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const collections = await collectionService.getAllCollections();
    return res.status(200).json(collections);
  } catch (error) {
    console.error("Get All Collections Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getFeatured = async (req, res) => {
  try {
    const collections = await collectionService.getFeaturedCollections();
    return res.status(200).json(collections);
  } catch (error) {
    console.error("Get Featured Collections Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const collection = await collectionService.getCollectionBySlug(slug);
    return res.status(200).json(collection);
  } catch (error) {
    console.error("Get Collection By Slug Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Collection not found" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await collectionService.updateCollection(id, req.body);
    return res.status(200).json({ message: "Collection updated successfully", collection });
  } catch (error) {
    console.error("Update Collection Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await collectionService.deleteCollection(id);
    return res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Delete Collection Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
