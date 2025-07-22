import mongoose from "mongoose";
import { Schema } from "mongoose";

const PortfolioSchema = new Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    projectCategorise: {
      type: [String], 
      required: true,
    },
    portfolio: {
      type: String,
    },
    about:{
      type:String,
    },
    url:{
      type:String,
    }
  },
  { timestamps: true } 
);

export default mongoose.model("Portfolio", PortfolioSchema);
