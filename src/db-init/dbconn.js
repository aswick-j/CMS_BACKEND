import mongoose from "mongoose";

var url = "mongodb://localhost:27017/pinkie";

export const connectDB = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected");
  } catch (err) {
    console.log("Something went wrong",err);
    process.exit(1);
  }
};