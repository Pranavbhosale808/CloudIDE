// components/FileTreeHeader.jsx
import { FiFilePlus } from "react-icons/fi";

const FileTreeHeader = ({ onCreate }) => (
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-yellow-400 font-bold text-lg">📁 File Explorer</h3>
    <FiFilePlus
      className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
      onClick={onCreate}
      title="Create New File"
    />
  </div>
);

export default FileTreeHeader;
