import mongoose from "mongoose";
import { Schema } from "mongoose";

const GoogleSchema= new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  image: String,
})
export default mongoose.model("GoogleUser", GoogleSchema);
