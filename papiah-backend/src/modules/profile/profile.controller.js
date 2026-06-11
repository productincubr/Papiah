import * as profileService from "./profile.service.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const summary = await profileService.getProfileSummary(userId);
    return res.status(200).json(summary);
  } catch (error) {
    console.error("Get Profile Summary Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getRewards = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const rewards = await profileService.getRewardsHistory(userId);
    return res.status(200).json(rewards);
  } catch (error) {
    console.error("Get Rewards History Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const redeemPoints = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { redeemType } = req.body;
    const result = await profileService.redeemRewardPoints(userId, redeemType);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Redeem Reward Points Error:", error);
    return res.status(400).json({ error: error.message || "Bad Request" });
  }
};
