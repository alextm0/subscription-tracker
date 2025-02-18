import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.production/development.local");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch(error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
}

export default connectToDatabase;