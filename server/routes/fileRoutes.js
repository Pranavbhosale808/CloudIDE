import path from 'path';
import express from 'express';
import { generateFileTree, readFileContent, writeFileContent } from '../models/fileModel.js';
import { getUserFiles,createFile, deleteFile,renameFile,createDirectory,uploadFile, } from '../controllers/userFileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { log } from 'console';



const router = express.Router();
const basePath = (req) => `${process.cwd()}/user/${req.header('username')}`;
const upload = multer({ dest: 'uploads/' }); 

router.get("/", async (req, res) => {
  const fileTree = await generateFileTree(basePath(req));
  res.json({ tree: fileTree });
});

router.get("/fetch_content", async (req, res) => {
  const filePath = req.query.path;
  try {
    const fullPath = path.join(basePath(req),filePath);
    const content = await readFileContent(fullPath);
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Failed to load file content." });
  }
});

router.post("/save", async (req, res) => {
  const { path, content } = req.body;
  try {
    console.log("Saving the file: ", path);
    
    await writeFileContent(`${basePath}/${path}`, content);
    res.json({ message: "File saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving file" });
  }
});

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
router.post('/upload', verifyToken, upload.single('file'), uploadFile);

export default router;