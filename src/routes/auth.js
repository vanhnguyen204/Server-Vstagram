import express from 'express'
import AuthController from "../app/controllers/AuthController.js";
import { authMiddleware } from '../middleware/auth.js';
const route = express.Router();

route.post('/register', AuthController.register);
route.post('/verify', AuthController.verify);
route.post('/create-account', AuthController.createAccount);
route.post('/login', AuthController.login);
route.patch('/user/activity', authMiddleware, AuthController.activeActivity);
route.get('/information', authMiddleware, AuthController.getUserInformation)
route.get('/user/all', authMiddleware, AuthController.getAllUser)
export default route;
