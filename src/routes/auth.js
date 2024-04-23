import express from 'express'
import AuthController from "../app/controllers/AuthController.js";
const route = express.Router();

route.post('/register', AuthController.register);
route.post('/verify', AuthController.verify);
route.post('/create-account', AuthController.createAccount);
route.post('/login', AuthController.login)

export default route;
