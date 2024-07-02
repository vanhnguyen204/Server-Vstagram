import express from 'express'
import StoryController from '../app/controllers/StoryController.js';

import upload from '../config/common/upload.js'
import { authMiddleware } from '../middleware/auth.js';
const route = express.Router();

route.post('/', upload, authMiddleware, StoryController.createStory);
route.get('/', authMiddleware, StoryController.getStories)

export default route;
