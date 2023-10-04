
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.get('/',(req,res)=>{
  res.json("API is running");
})

app.use('/posts', postRoutes);
app.use("/user", userRouter);


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(cors({
  origin: '*',
}));

dotenv.config();
const CONNECTION_URL = process.env.REACT_APP_MONGO_DB_URL;
const PORT = process.env.REACT_APP_PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);
