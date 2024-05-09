import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import createEngine from 'express-handlebars'
import routes from "./routes/index.js";
import connect from "./config/db/index.js";
import ipAddress from "./utils/ipAddress.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import IpAddress from "./utils/ipAddress.js";

import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);
const s3Client = new S3Client({
    region: 'Asia Pacific (Sydney) ap-southeast-2'
})
// Template engine

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
routes(app);

// Database connection
connect();

// Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');
});

// Start the server
server.listen(port, IpAddress, () => {
    console.log(`Vstagram is listening at http://${ipAddress}:${port}`);
});
// Socket.io server
const socketPort = 8080;
const socketServer = http.createServer();
const socketIo = new Server(socketServer);

socketServer.listen(socketPort, () => {
    console.log(`Socket io is listening at port ${socketPort}!`);
});
