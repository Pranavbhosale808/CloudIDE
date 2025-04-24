// services/api.js
import axios from "axios";
import { API_URL } from "../config/config";
import { getToken,getUsername } from "../utils/auth";


// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create new file
export const createFile = async (filename, content = "") => {
  return api.post("/files/create", { filename, content });
};

// Fetch file tree
export const getFileTree = async () => {
  const username = localStorage.getItem("username");
  return api.get("/files", {
    headers: {
      username,
    },
  });
};

// Fetch specific file content
export const getFileContent = async (fileId) => {
  return api.get(`/files/${fileId}`);
};

// Save changes to a file
export const updateFile = async (fileId, newContent) => {
  return api.put(`/files/${fileId}`, { content: newContent });
};

// Fetch content of file by path
export const fetchFileContentByPath = async (path,username) => {
  const res = await api.get(`/files/fetch_content`, {
    params: {
       path:path,
      },
      headers: {
        username: username
      },
  });
  return res.data;
};

// Delete a file
export const deleteFile = async (filename) => {
  try {
    console.log('Deleting filename:', filename);
    const token = getToken();
    const cleanFilename = filename.startsWith("/") ? filename.substring(1) : filename;

    const response = await api.delete(`/files/delete/${cleanFilename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return (await response).data;
  } catch (error) {
    console.error("Error deleting file:", error.response?.data || error.message);
    throw error;
  }
};

export const renameFile = async (oldName, newName) => {
  try {
    const token = getToken();
    const response = await api.put(`/files/rename`, { oldName, newName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data;
  } catch (error) {
    console.error("Error renaming file:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
