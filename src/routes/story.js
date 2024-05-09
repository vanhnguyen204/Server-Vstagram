import express from 'express'
import StoryController from '../app/controllers/StoryController.js';

import upload from '../config/common/upload.js'
const route = express.Router();

route.post('/', upload, StoryController.createStory);

export default route;
