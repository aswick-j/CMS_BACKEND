import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectDB } from './src/db-init/dbconn.js';
import logger from './src/utils/Logger.js';

const app =express()

app.use(bodyParser.json())

app.use(cors())

connectDB()

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>logger.info(`Server is listening on Port ${PORT}`))

app.all("*",(req,res)=>{res.send("Route not found")})


