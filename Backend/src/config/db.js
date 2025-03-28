// db.js - Connects to MongoDB database using Mongoose

import mongoose from "mongoose";
import { config } from "dotenv";
config()

let connection=mongoose.connect(process.env.MONGODBURL)
export default  connection