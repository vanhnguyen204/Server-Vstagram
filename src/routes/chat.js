import express from 'express'

import { authMiddleware } from '../middleware/auth.js';
import ChatController from '../app/controllers/ChatController.js';
const route = express.Router();

route.get('/', authMiddleware, ChatController.getConversations);
route.get('/details', authMiddleware, ChatController.getConversationDetails)

export default route;