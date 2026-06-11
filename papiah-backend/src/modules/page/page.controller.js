import * as pageService from "./page.service.js";

export const create = async (req, res) => {
  try {
    const { title, slug, content, seoTitle, seoDescription } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ error: "Page title, slug and content are required" });
    }

    const page = await pageService.createPage({
      title,
      slug,
      content,
      seoTitle,
      seoDescription,
    });

    return res.status(201).json({ message: "Page created successfully", page });
  } catch (error) {
    console.error("Create Page Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const pages = await pageService.getAllPages();
    return res.status(200).json(pages);
  } catch (error) {
    console.error("Get All Pages Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await pageService.getPageBySlug(slug);
    return res.status(200).json(page);
  } catch (error) {
    console.error("Get Page By Slug Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Page not found" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await pageService.updatePage(id, req.body);
    return res.status(200).json({ message: "Page updated successfully", page });
  } catch (error) {
    console.error("Update Page Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await pageService.deletePage(id);
    return res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Delete Page Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};
