import Normaluser from "../Schema/NormaluserSchema.js";

export const createNormaluser = async (req, res) => {
    try {
        const { fullName, gender, address, hasCompany, companyName, companyGST, phoneNo, email, imageUrl, userId } = req.body;

        if (!fullName) {
            return res.status(400).json({ error: "Required fields are missing." });
        }

        let profile = await Normaluser.findOne({ userId });

        if (profile) {
            profile.fullName = fullName || profile.fullName;
            profile.gender = gender || profile.gender;
            profile.phoneNo = phoneNo || profile.phoneNo;
            profile.email = email || profile.email;
            profile.imageUrl = imageUrl || profile.imageUrl;
            profile.hasCompany = hasCompany || profile.hasCompany;
            profile.companyName = companyName || profile.companyName;
            profile.companyGST = companyGST || profile.companyGST;

            if (address) {
                profile.address = {
                    address1: address.address1 || profile.address.address1,
                    address2: address.address2 || profile.address.address2,
                    pincode: address.pincode || profile.address.pincode,
                    city: address.city || profile.address.city,
                    state: address.state || profile.address.state,
                    country: address.country || profile.address.country,
                };
            }

            await profile.save();
            return res.status(200).json({ message: "Profile updated successfully", profile,profile_id: profile._id });
        } else {
            profile = new Normaluser({
                userId, fullName, gender, address, hasCompany, companyName, companyGST, phoneNo, email, imageUrl
            });

            await profile.save();
            return res.status(201).json({ message: "Profile created successfully", profile, profile_id: profile._id });
        }
    } catch (error) {
        console.error("Error in createNormaluser:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const getNormaluser = async (req, res) => {
    try {
        const { id } = req.query||req.parmas; // Extract profile_id from URL parameters

        if (!id) {
            return res.status(400).json({ error: "Profile ID is required." });
        }

        const profile = await Normaluser.findById(id);

        if (!profile) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json({ message: "User profile retrieved successfully", profile });
    } catch (error) {
        console.error("Error in getNormaluser:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
