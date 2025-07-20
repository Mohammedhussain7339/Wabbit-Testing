import express from "express";
import {profiledata ,getprofileimg ,getprofile,getAllProfiles,updateProfileCheck  } from "../Controller/profile.js"

const router = express.Router();

// Define the route for profile data submission
router.post("/profile",profiledata);
router.get("/getprofile",getprofile);
router.get("/getprofileimg",getprofileimg);
router.get("/all", getAllProfiles);
router.put("/updateProfileCheck",updateProfileCheck )

export default router;
