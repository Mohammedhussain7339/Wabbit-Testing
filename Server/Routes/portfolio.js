import express from "express";
import { profiledata, getprofiledata } from '../Controller/portfolio.js';
const router = express.Router();

// Define the route for profile data submission
router.post("/portfolio", profiledata);
router.get("/portfolio/:userId", getprofiledata);

export default router;
