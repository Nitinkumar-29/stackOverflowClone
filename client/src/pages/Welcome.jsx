// Welcome.js

import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-slate-950 text-white min-h-[89.15vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="tracking-wider text-7xl font-extrabold bg-clip-text inline-block text-transparent bg-gradient-to-tr from-green-400 via-pink-900 to-red-400">
          Welcome to TechAid
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Get help and share your knowledge with a community of developers.
        </p>
        <button className="bg-blue-700 hover:bg-blue-800 text-sm md:text-base text-white font-semibold py-2 px-4 rounded-full">
          <Link to="/questions">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
