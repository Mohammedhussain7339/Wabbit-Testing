import ProfileSchema from "../Schema/ProfileSchema.js";

export const profiledata = async (req, res) => {
  try {
    const {
      userId,
      firstname,
      lastname,
      occupation,
      university,
      region,
      city,
      portfoliolinks,
      description,
      languages,
      skills,
      contact,
      email,
      imageUrl,
      check,
    } = req.body;

    console.log("Received userId:", userId);

    // Validate required fields
    // if (!firstname || !lastname || !description) {
    //   return res.status(400).json({ error: "Required fields are missing." });
    // }

    // Check if profile already exists for the given userId
    // let profile = await ProfileSchema.findOne({ _id }); // Find profile by _id
    let profile = await ProfileSchema.findOne({ userId });

    if (profile) {
      // Update only the fields that are provided in the request body
      profile.firstname = firstname || profile.firstname;
      profile.lastname = lastname || profile.lastname;
      profile.occupation = occupation || profile.occupation;
      profile.university = university || profile.university;
      profile.region = region || profile.region;
      profile.city = city || profile.city;
      profile.portfoliolinks = portfoliolinks || profile.portfoliolinks;
      profile.description = description || profile.description;
      profile.languages =
        languages && languages.length > 0 ? languages : profile.languages;
      profile.skills = skills || profile.skills;
      profile.contact = contact || profile.contact;
      profile.email = email || profile.email;
      profile.imageUrl = imageUrl || profile.imageUrl;

      // Save the updated profile
      await profile.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        profile_id: profile._id, // Return the profile ID
        profile,
      });
    }
    // Create and save the new profile if it doesn't exist
    const newProfile = new ProfileSchema({
      userId,
      firstname,
      lastname,
      occupation,
      university,
      region,
      city,
      portfoliolinks,
      description,
      languages,
      skills,
      contact,
      email,
      imageUrl,
      check,
    });

    const savedProfile = await newProfile.save();

    return res.status(201).json({
      message: "Profile created successfully",
      profile_id: savedProfile._id, // Return the new profile ID
      profile: savedProfile,
    });
  } catch (error) {
    console.error(
      "Internal server error at profile data controller 🔴:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

//fetch data
// Fetch profile data
export const getprofile = async (req, res) => {
  try {
    const { userId, id, skills, check } = req.query;

    let profiles; // ✅ declare it first

    if (id) {
      profiles = await ProfileSchema.findById(id);
      if (!profiles) {
        return res.status(404).json({ error: "Profile not found" });
      }
    } else if (userId) {
      profiles = await ProfileSchema.findOne({ userId });
      if (!profiles) {
        return res.status(404).json({ error: "Profile not found for the given userId" });
      }
    } else if (skills && check === "true") {
      profiles = await ProfileSchema.find({
        skills: { $regex: skills, $options: "i" },
        check: true,
      });
    } else if (skills) {
      profiles = await ProfileSchema.find({
        skills: { $regex: skills, $options: "i" },
      });
    } else {
      profiles = await ProfileSchema.find();
    }

    res.status(200).json({ data: profiles });
  } catch (error) {
    console.error("Internal server error at get profile data controller 🔴:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProfiles=async(req,res)=>{
  try{
    const profiledata = await ProfileSchema.find().lean(); // 👈 .lean() removes Mongoose overhead
    res.status(200).json({data:profiledata});
    
  }
  catch(error){
    console.error("Internal server error at getAllProfiles 🔴:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// PUT /api/updateProfileCheck
export const updateProfileCheck = async (req, res) => {
  try {
    const { id, check } = req.body;

    if (!id) return res.status(400).json({ error: "Profile ID is required" });

    const updated = await ProfileSchema.findByIdAndUpdate(
      id,
      { check },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ message: "Check updated", data: updated });
  } catch (err) {
    console.error("Error updating check 🔴:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getprofileimg = async (req, res) => {
  try {
    const {  id } = req.query;

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ error: "Profile ID is required" });
    }

    // Validate if ID is a valid MongoDB ObjectId
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid Profile ID format" });
    }

    // Fetch the image URL from the database
    const profile = await ProfileSchema.findById(id).select("imageUrl");

    if (!profile) {
      return res.status(404).json({ error: "Profile image not found" });
    }

    return res.status(200).json({ success: true, imageUrl: profile.imageUrl });
  } catch (error) {
    console.error(
      "Internal server error at getprofileimg controller 🔴:",
      error
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
