import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = ({ onClick, label = "Continue with Google" }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
    >
      <FcGoogle size={24} />
      {label}
    </button>
  );
};

export default GoogleAuthButton;
