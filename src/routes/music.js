import express from 'express'
import { MusicController } from "../app/controllers/MusicController.js";
import upload from '../config/common/upload.js'
import { authMiddleware } from '../middleware/auth.js';

const route = express.Router();
route.post('/', upload, MusicController.createMusic);
route.get('/', MusicController.getMusics)
export default route;