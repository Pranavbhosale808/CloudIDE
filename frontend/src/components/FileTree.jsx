import React, { useEffect, useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Folder, InsertDriveFile, ExpandMore, ChevronRight, DeleteForever } from "@mui/icons-material";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/config";
import { createFile, getFileTree ,deleteFile} from "../services/api";
import FileTreeHeader from "./FileTreeHeader";

const socket = io(SOCKET_URL, { transports: ['websocket'] });

const renderTree = (nodes, parentPath = "", onFileSelect, onDeleteFile) =>
  Object.entries(nodes).map(([key, value]) => {
    const currentPath = `${parentPath}/${key}`;
    const isFolder = typeof value === "object" && value !== null;

    return (
      <TreeItem
        key={currentPath}
        itemId={currentPath}
        label={
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => !isFolder && onFileSelect(currentPath)}
          >
            {isFolder ? <Folder className="text-yellow-400" /> : <InsertDriveFile className="text-gray-400" />}
            <span>{key}</span>
            {!isFolder && (
              <DeleteForever
                className="text-red-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(currentPath);
                }}
              />
            )}
          </div>
        }
      >
        {isFolder && renderTree(value, currentPath, onFileSelect, onDeleteFile)}
      </TreeItem>
    );
  });

const FileTree = ({ onFileSelect, onDeleteFile }) => {
  const [fileTree, setFileTree] = useState(null);

  const fetchTree = async () => {
    try {
      const res = await getFileTree();
      setFileTree(res.data.tree);
    } catch (err) {
      console.error("Error fetching file tree:", err);
    }
  };

  useEffect(() => {
    fetchTree();
    socket.on("fileUpdate", fetchTree);
    return () => socket.off("fileUpdate", fetchTree);
  }, []);

  const handleCreateNewFile = async () => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;

    try {
      await createFile(fileName, "");
      toast.success("File created successfully");
      fetchTree();
    } catch (error) {
      console.error("Error creating file:", error);
      toast.error("Error creating file");
    }
  };

  const handleDeleteFile = async (path) => {
    const confirm = window.confirm("Are you sure you want to delete this file?");
    console.log("Path: ", path);
    
    if (confirm) {
      try {
        const filename = decodeURIComponent(path.split("/").pop());
        await deleteFile(encodeURIComponent(filename));
        toast.success("File deleted successfully");
        fetchTree();
      } catch (error) {
        console.error("Error deleting file:", error);
        toast.error("Error deleting file");
      }
    }
  };
  return (
    <div className="filetree-container p-3">
      <FileTreeHeader onCreate={handleCreateNewFile} />
      <hr className="border-t border-gray-600 mb-3" />
      {fileTree ? (
        <SimpleTreeView
          aria-label="file system navigator"
          slots={{ collapseIcon: ExpandMore, expandIcon: ChevronRight }}
        >
          {renderTree(fileTree, "", onFileSelect, handleDeleteFile)}
        </SimpleTreeView>
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </div>
  );
};

export default FileTree;
