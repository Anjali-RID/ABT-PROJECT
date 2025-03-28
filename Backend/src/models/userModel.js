// userModel.js - Defines the Mongoose schema for storing user information
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ---- Define Schema 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    number: { 
      type: String,
      unique: true, 
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      sparse: true,  
    },
    password: { 
      type: String, 
      required: true, 
      minlength: 6 
    },
    role: { type: String, enum: ["User", "Admin", "Reviewer"], default: "User" }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);





// ---- Define Model
const UserModel = mongoose.model("aUser", userSchema);

export default UserModel;
