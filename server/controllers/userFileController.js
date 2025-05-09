import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import { generateFileTree, readFileContent, writeFileContent } from '../models/fileModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath = (req) => `${process.cwd()}/user/${req.header('username')}`;
const upload = multer({ dest: 'uploads/' }); 


export const getFileTree = async (req, res) => {
  try {
    const fileTree = await generateFileTree(basePath(req));
    res.json({ tree: fileTree });
  } catch (error) {
    res.status(500).json({ message: 'Error generating file tree', error: error.message });
  }
};

export const fetchFileContent = async (req, res) => {
  const filepath = req.query.path;
  try {
    const fullPath = path.join(basePath(req), filepath);
    const content = await readFileContent(fullPath);  
    res.json({ content });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching file content', error: error.message });
  }
}

export const saveFileContent = async (req, res) => {
  const { path, content } = req.body;
  try {
    const fullpath = path.join(basePath(req), path);
    await writeFileContent(fullpath, content);
    res.json({ message: 'File saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving file', error: error.message });
  }
}

export async function getUserFiles(req, res) {
  const username = req.user.username;
  const userDir = path.join(__dirname, '../user', username);

  try {
    const files = await fs.readdir(userDir);
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: 'Error reading files', error: err });
  }
}


// Create new file
export const createFile = async (req, res) => {
  const { filename, content } = req.body;
  const username = req.user.username;

  const filePath = path.join(__dirname, '../user', username, filename);

  try {
    await fs.writeFile(filePath, content || '');
    res.status(201).json({ message: 'File created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating file', error: err.message });
  }
};

// Delete file
export const deleteFile = async (req, res) => {
  const { filename } = req.params;
  const username = req.user.username;

  const filePath = path.join(__dirname, '../user', username, filename);

  try {
    await fs.unlink(filePath);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
};

// Rename file
export const renameFile = async (req, res) => {
  const { oldName, newName } = req.body;
  const username = req.user.username;

  const userDir = path.join(__dirname, '../user', username);
  const oldPath = path.join(userDir, oldName);
  const newPath = path.join(userDir, newName);

  try {
    await fs.rename(oldPath, newPath);
    res.status(200).json({ message: 'File renamed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error renaming file', error: err.message });
  }
};

// Create directory
export const createDirectory = async (req, res) => {
  const { dirname } = req.body;
  const username = req.user.username;

  const dirPath = path.join(__dirname, '../user', username, dirname);

  try {
    await fs.mkdir(dirPath, { recursive: true });
    res.status(201).json({ message: 'Directory created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating directory', error: err.message });
  }
};

// Upload file (Single file)
export const uploadFile = async (req, res) => {
  const username = req.user.username;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const uploadPath = path.join(__dirname, '../user', username, file.originalname);

  try {
    await fs.rename(file.path, uploadPath); // move temp upload to user 
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
