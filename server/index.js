import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
const app= express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb", extended:true}));

app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
      .then(()=>app.listen(PORT,()=>console.log(`Server running :${PORT}`)))
      .catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify',false);