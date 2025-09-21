import mongoose from "mongoose";

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
