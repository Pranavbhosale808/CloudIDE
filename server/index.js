import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server as SocketServer } from 'socket.io';

import { initialize } from './controllers/terminalController.js';
import { watchFiles } from './controllers/fileWatcherController.js';

import fileRoutes from './routes/fileRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo Error:', err));

// Socket Server Setup
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Terminal & File Watcher
initialize(io);
watchFiles(io);

// Routes
app.use('/auth', authRoutes);       // 🔐 Login/Register
app.use('/files', fileRoutes);      // 🗂️ File API (protect with JWT if needed)

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));