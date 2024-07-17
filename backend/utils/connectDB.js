import mongoose from "mongoose";

const db_url = process.env.MONGO_URI;

//CONNECT TO MONGO DB
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", () => {
      console.log("MongoDB connection failed");
    });
    return await mongoose.connect(db_url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
