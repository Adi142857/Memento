import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import dotenv from 'dotenv';

import PostMessage from '../models/postMessage.js';

dotenv.config();

const router = express.Router();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  
  redisClient.connect().catch(console.error);
  
  // Middleware to get posts with Redis caching
  export const getPosts = async (req, res) => {
    const { page } = req.query;
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // Starting index for pagination
  
    // Define Redis cache key using page number to differentiate paginated results
    const cacheKey = `posts:page:${page}`;
  
    try {
      // Check if cached data exists
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        // Parse the cached JSON data and send it as a response
        console.log('Serving from Redis Cache');
        return res.json(JSON.parse(cachedData));
      }
  
      // If not in cache, fetch from MongoDB
      const total = await PostMessage.countDocuments({});
      const posts = await PostMessage.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);
  
      // Structure the response
      const responseData = {
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      };
  
      // Cache the data in Redis and set an expiration time (e.g., 600 seconds)
      await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));
  
      // Send the response
      res.json(responseData);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


export const deletePost=async(req,res)=>{
    const { id } = req.params;
    
   
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        
        await PostMessage.findByIdAndRemove(id,{new:true});
        res.json({ message: "Post deleted successfully." });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }

    
}


export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;