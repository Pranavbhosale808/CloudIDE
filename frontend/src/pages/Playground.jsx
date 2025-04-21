import React, { useCallback, useEffect, useState } from "react";
import FileTreeWrapper from "../components/FileTreeWrapper";
import CodeEditor from "../components/CodeEditor";
import TerminalWrapper from "../components/TerminalWrapper";
import Footer from "../components/Footer";
import socket from "../socket/socket";
import { fetchFileContentByPath } from "../services/api"; // ✅ imported

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { getUsername } from "../utils/auth";

const Playground = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("monokai");
  const [showFileTree, setShowFileTree] = useState(true);

  const isSaved = selectedFileContent === code;
  const username = getUsername();

  //  fetch file content using api method
  const getFileContent = useCallback(async (path) => {
    try {
      const data = await fetchFileContentByPath(path,username);
      setSelectedFileContent(data.content);
    } catch (err) {
      console.error("Error fetching file content:", err);
    }
  }, []);

  useEffect(() => {
    if (selectedFile) getFileContent(selectedFile);
  }, [selectedFile, getFileContent]);

  useEffect(() => {
    setCode(selectedFileContent || "");
  }, [selectedFileContent]);

  useEffect(() => {
    // Reset code on file change (optional for UX)
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    if (code && !isSaved) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
        setSelectedFileContent(code);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [code, isSaved, selectedFile]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white font-mono">
      <div className="flex-1 p-4 flex gap-4">
        {showFileTree && (
          <div className="w-1/5">
            <FileTreeWrapper onFileSelect={setSelectedFile} />
          </div>
        )}

        <div className={`${showFileTree ? "w-2/5" : "w-1/2"} flex flex-col gap-2`}>
          <div className="text-sm font-medium">
            {isSaved ? (
              <span className="text-green-400">✅ Saved</span>
            ) : (
              <span className="text-red-400">💾 Unsaved changes</span>
            )}
          </div>
          {selectedFile && <div className="text-xs text-blue-300">📄 {selectedFile}</div>}

          <CodeEditor code={code} setCode={setCode} theme={theme} />
        </div>

        <div className={`${showFileTree ? "w-2/5" : "w-1/2"}`}>
          <TerminalWrapper />
        </div>

        <button
          onClick={() => setShowFileTree(!showFileTree)}
          className="absolute top-20 left-2 bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg shadow"
        >
          {showFileTree ? "❌" : "📁"}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Playground;
