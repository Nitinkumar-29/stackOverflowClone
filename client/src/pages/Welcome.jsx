// Welcome.js

import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-slate-950 text-slate-500 max-h-screen h-[90.7vh] flex items-center justify-center">
      <div className="flex flex-col text-center space-y-8">
        <h1 className="tracking-wider text-7xl font-extrabold bg-clip-text inline-block text-transparent bg-gradient-to-tr from-green-400 via-pink-900 to-red-400">
          Welcome to TechAid
        </h1>
        <p className="">
          Get help and share your knowledge with a community of developers.
        </p>
        <Link
          to="/questions"
          className="w-fit mx-auto text-lg hover:text-slate-200 px-4 py-2 rounded-md border-[1px] border-slate-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
