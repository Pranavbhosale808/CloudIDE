import React from "react";
import TerminalComponent from "./TerminalComponent";

const TerminalWrapper = () => {
  return (
    <div className="w-full h-full bg-[#0f172a] p-3 rounded-lg shadow-inner border border-blue-700 overflow-y-auto">
      <TerminalComponent />
    </div>
  );
};

export default TerminalWrapper;