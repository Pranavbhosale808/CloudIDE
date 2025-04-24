import express from 'express';
import { 
  saveFileContent,
  fetchFileContent,
  getFileTree,
  getUserFiles,
  createFile, 
  deleteFile,
  renameFile,
  createDirectory,
  uploadFile } from '../controllers/userFileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

// Get the File Tree
router.get('/', getFileTree);

// Fetch the Content of the file
router.get('/fetch_content', fetchFileContent);

// Save the Content of the file
router.post('/save', saveFileContent)

// Fetch File
router.get('/getfiles', verifyToken, getUserFiles);

// Create File
router.post('/create', verifyToken, createFile);

// Delete File
router.delete('/delete/:filename', verifyToken, deleteFile);

// Rename File
router.post('/rename', verifyToken, renameFile);

// Create Directory
router.post('/mkdir', verifyToken, createDirectory);

// Upload File
//router.post('/upload', verifyToken, upload.single('file'), uploadFile);

export default router;