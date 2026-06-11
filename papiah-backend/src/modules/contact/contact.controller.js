import * as contactService from "./contact.service.js";

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message fields are required" });
    }

    const savedMessage = await contactService.saveMessage({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({ message: "Contact message sent successfully", contactMessage: savedMessage });
  } catch (error) {
    console.error("Submit Contact Message Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
