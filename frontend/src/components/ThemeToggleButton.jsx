import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggleButton = ({ theme, onToggleTheme }) => {
  return (
    <button
      onClick={onToggleTheme}
      className="bg-black/20 hover:bg-black/40 text-white px-3 py-1 rounded-lg border border-blue-500 flex items-center gap-2 absolute top-2 right-2"
    >
      {theme === "monokai" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      {theme === "monokai" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggleButton;
