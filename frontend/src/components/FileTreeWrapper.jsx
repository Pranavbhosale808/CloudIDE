import React from "react";
import FileTree from "./FileTree";

const FileTreeWrapper = ({ onFileSelect }) => {
  return (
    <div className="w-full h-full bg-[#111827] p-3 rounded-lg shadow-inner overflow-y-auto border border-blue-700">
      <FileTree onFileSelect={onFileSelect} />
    </div>
  );
};

export default FileTreeWrapper;