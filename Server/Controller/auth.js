import dotenv from "dotenv";
import UserSchema from "../Schema/UserSchema.js";
import Profile from "../Schema/ProfileSchema.js"; // make sure to import ProfileSchema
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
export const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      freelancingPurpose,
      companySize,
      purpose,
      freelancerType,
      sellingPurpose,
      experienceMode,
    } = req.body;

    // Validate email format
    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email. Please provide a valid email address.",
      });
    }

    // Check if email or username already exists
    const alreadyUser = await UserSchema.findOne({ email: email });
    const alreadyUsername = await UserSchema.findOne({ username: username });

    if (alreadyUser) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    if (alreadyUsername) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user with additional fields
    const newUser = new UserSchema({
      username: username,
      email: email,
      password: hashedPass,
      freelancerType: freelancerType, // Default to empty string if not provided
      freelancingPurpose: freelancingPurpose || [""], // Default to an empty array if not provided
      sellingPurpose: sellingPurpose || "",
      companySize: companySize || "", // Default to empty string if not provided
      purpose: purpose || "",
      experienceMode: experienceMode || "",
    });

    // Save the user to DB
    await newUser.save();

    // Generate JWT token
    const payload = { _id: newUser._id };
    const authToken = jwt.sign(payload, process.env.JWTSECRET);
    res.status(200).send({
      authToken,
      _id: newUser._id,
      message: "User created successfully",
      success: true, 
      username: newUser.username,
      accountType: newUser.freelancerType,
    });
  } catch (error) {
    console.log("Internal server error at register auth controller 🔴 ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login

export const loginUser = async (req, res) => {
  try {
    const { data, password } = req.body;

    if (!data || !password) {
      return res.status(400).json({
        error: "Please provide either email or username along with a password.",
      });
    }

    // Check if email or username
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data
    );

    const user = await UserSchema.findOne(
      isEmail ? { email: data } : { username: data }
    );

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email/username or password." });
    }

    // Check password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: "Invalid email/username or password." });
    }

    // Generate JWT token
    const payload = { _id: user._id };
    const authToken = jwt.sign(payload, process.env.JWTSECRET);
const userProfile = await Profile.findOne({ userId: user._id });


    return res.status(200).json({
      _id: user._id,
      profileId: userProfile?._id || null,
      authToken,
      username: user.username,
      accountType: user.freelancerType, 
      message: "User login successfully",
      success: true,
    });
  } catch (error) {
    console.log("Internal server error at login auth controller 🔴 ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const setinfo = async (req, res) => {
  try {
    const {
      userId,
      freelancerType,
      freelancingPurpose,
      companySize,
      purpose,
      sellingPurpose,
      experienceMode,
    } = req.body;

    // Validate fields before updating
    if (
      !userId ||
      !freelancerType ||
      !freelancingPurpose ||
      !companySize ||
      !purpose
    ) {
      return res.status(400).json({
        error: "Missing required fields for updating user information.",
      });
    }

    // Update user information based on user ID
    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      {
        freelancerType,
        freelancingPurpose,
        companySize,
        purpose,
        sellingPurpose,
        experienceMode,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User information updated successfully",
      userType: updatedUser.freelancerType,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error at setinfo auth controller 🔴 ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
