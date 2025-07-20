import mongoose from 'mongoose';
import { Schema } from "mongoose";
import User from "./UserSchema.js"; 

const ProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    occupation: { type: String },
    university: { type: String },
    region:{type:String,required:true},
    city:{type:String,required:true},
    portfoliolinks: { type: String },
    description: { type: Array, required: true },
    // prfilePicture:[String],
    skills: [String],
    languages: [
      {
        language: { type: String, required: true },
        proficiency: { type: String, required: true },
      },
    ],
         contact:[String],
    email:[String],
    imageUrl:[String],
    check:{type:Boolean,default:false}
    },
);

export default mongoose.model("Profile", ProfileSchema);
