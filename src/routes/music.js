import express from 'express'
import { MusicController } from "../app/controllers/MusicController.js";
import upload from '../config/common/upload.js'

const route = express.Router();
route.post('/create', upload, MusicController.createMusic);
route.get('/', MusicController.getAllMusic)
export default route;