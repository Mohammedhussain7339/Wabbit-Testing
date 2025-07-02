import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Schema/GoogleLoginSchema.js";

dotenv.config();

export const googleLogin = async (req, res) => {
  const { name, email, googleId, image } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ name, email, googleId, image });
      await user.save();
    }

    // Generate JWT Token
    const payload = { _id: user._id };
    const authToken = jwt.sign(payload, process.env.JWTSECRET);

    res.status(200).json({
      authToken,
      _id: user._id,
      message: "Login successful",
      success: true,
      username: user.name,
      image: user.image,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
