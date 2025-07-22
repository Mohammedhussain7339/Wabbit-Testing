import PortfolioSchema from "../Schema/PortfolioSchema.js";
import mongoose from "mongoose";

export const profiledata = async (req, res) => {
  try {
    const { userId, title, projectCategorise, portfolio, about } = req.body;

    if (!title || !projectCategorise || !portfolio || !about) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    let portfoliodata = await PortfolioSchema.findOne({ userId });

    if (portfoliodata) {
      portfoliodata.title = title || portfoliodata.title;
      portfoliodata.projectCategorise = projectCategorise || portfoliodata.projectCategorise;
      portfoliodata.portfolio = portfolio || portfoliodata.portfolio;
      portfoliodata.about = about || portfoliodata.about;

      await portfoliodata.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        profile: portfoliodata,
      });
    }

    const newProfile = new PortfolioSchema({
      userId,
      title,
      projectCategorise,
      portfolio,
      about
    });

    const savedProfile = await newProfile.save();

    return res.status(201).json({
      message: "Profile created successfully",
      profile_id: savedProfile._id,
      profile: savedProfile,
    });

  } catch (error) {
    console.error("Internal server error at profile data controller 🔴:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getprofiledata = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

const profile = await PortfolioSchema.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
