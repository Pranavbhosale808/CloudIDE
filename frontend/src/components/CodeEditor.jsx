import React from "react";
import AceEditor from "react-ace";

const CodeEditor = ({ code, setCode, theme }) => {
  return (
    <div className="flex-1 border border-blue-700 rounded-lg overflow-hidden">
      <AceEditor
        value={code}
        onChange={(value) => setCode(value)}
        mode="javascript"
        theme={theme}
        width="100%"
        height="100%"
        fontSize={14}
        setOptions={{ useWorker: false, enableLiveAutocompletion: true }}
      />
    </div>
  );
};

export default CodeEditor;


