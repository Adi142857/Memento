
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins; you can restrict this to specific domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/posts', postRoutes);
app.use("/  ", userRouter);

app.get('/',(req,res)=>{
  res.json("API is running");
  console.log("runnnnnnn  ")
})

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))


dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);

