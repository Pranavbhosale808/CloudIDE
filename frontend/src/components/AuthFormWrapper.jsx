import React from 'react';
import { motion } from 'framer-motion';

const AuthFormWrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-100 blur-sm"
        style={{ backgroundImage: `url('/Bg.jpg')` }}
      ></div>

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-800/30 via-black/50 to-black/80"></div>

      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 bg-black bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-500 w-[90%] sm:w-[450px]"
      >
        <div className="absolute inset-0 blur-md bg-blue-500 opacity-20 rounded-2xl animate-pulse z-0"></div>
        <div className="relative z-10 text-white space-y-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthFormWrapper;
