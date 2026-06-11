import { uploadImage } from "./upload.service.js";

export const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file" });
    }
    const result = await uploadImage(req.file.buffer, "products");
    return res.status(200).json({
      message: "Image uploaded successfully",
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Upload Image Error:", error);
    return res.status(500).json({ error: error.message || "Upload failed" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file" });
    }
    const result = await uploadImage(req.file.buffer, "avatars");
    return res.status(200).json({
      message: "Avatar uploaded successfully",
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Upload Avatar Error:", error);
    return res.status(500).json({ error: error.message || "Upload failed" });
  }
};
