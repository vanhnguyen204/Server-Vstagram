import express from 'express'


import upload from '../config/common/upload.js'
import { authMiddleware } from '../middleware/auth.js';
import PostController from '../app/controllers/PostController.js';
const route = express.Router();
route.post('/',upload, authMiddleware, PostController.createPost);
route.get('/', authMiddleware, PostController.getPosts);
export default route;
