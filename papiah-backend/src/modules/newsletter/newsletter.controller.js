import * as newsletterService from "./newsletter.service.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email field is required" });
    }

    const subscriber = await newsletterService.subscribeEmail(email);
    return res.status(200).json({ message: "Subscription successful", subscriber });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
