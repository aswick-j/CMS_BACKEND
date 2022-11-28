import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app =express()

app.use(bodyParser.json())

app.use(cors())

const PORT = process.env.PORT || 5555

app.listen(PORT,()=>console.log(`Server running on Port ${PORT}`))

