import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectDB } from "./src/db-init/dbconn.js";
import logger from "./src/utils/Logger.js";

import mongoose from "mongoose";

import userRoutes from "./src/routes/userRoutes.js"

const app = express();

app.use(bodyParser.json());

app.use(cors());

connectDB();

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
    logger.info('MongoDB Connected Successfully')
  app.listen(PORT, () => logger.info(`Server is listening on Port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  logger.info('DB Connection Failed')
});

// app.all("*", (req, res) => {
//   res.send("Route not found");
// });

app.use('/api/users',userRoutes)