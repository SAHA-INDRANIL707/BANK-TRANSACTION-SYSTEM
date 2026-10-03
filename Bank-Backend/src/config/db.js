const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
}

module.exports = connectDB;