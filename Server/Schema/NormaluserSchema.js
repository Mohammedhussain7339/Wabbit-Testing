import mongoose from "mongoose";
import { Schema } from "mongoose";

const NormaluserSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNo: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    hasCompany: { type: Boolean, default: false },
    companyName: { type: String, default: "" },
    companyGST: { type: String, default: "" },
    address: {
        address1: { type: String, default: "" },
        address2: { type: String, default: "" },
        pincode: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
    },
}, { timestamps: true });

export default mongoose.model("Normaluser", NormaluserSchema);
