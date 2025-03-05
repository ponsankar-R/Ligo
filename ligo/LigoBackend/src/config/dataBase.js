const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_STRING = process.env.DB_STRING; // Corrected typo: proccss to process

const connectDb = async () => { // Made the function async
  try {
    await mongoose.connect(DB_STRING, { 
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Handle the error appropriately, e.g., exit the process
    process.exit(1); 
  }
};

module.exports=connectDb;