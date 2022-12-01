import mongoose from "mongoose";
import logger from "../utils/Logger.js";
import config from "config";

const MONGO_DB_NAME = config.get("MONGO_DB_NAME");
const MONGO_DB_PASSWORD = config.get("MONGO_DB_PASSWORD");

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_NAME}:${MONGO_DB_PASSWORD}@cluster0.icx8fbn.mongodb.net/?retryWrites=true&w=majority`;

export const connectDB = async () => {
  try {
    mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB Connecting...");
  } catch (err) {
    // logger.info("Something went wrong",err);
    // process.exit(1);
  }
};
