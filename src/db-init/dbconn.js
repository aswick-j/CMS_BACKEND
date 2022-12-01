import mongoose from "mongoose";
import logger from "../utils/Logger.js";

var url = "mongodb://0.0.0.0:27017/cms";

export const connectDB = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Mongodb connected");
  } catch (err) {
    logger.info("Something went wrong",err);
    process.exit(1);
  }
};     