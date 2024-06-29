import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../Context/Theme/ThemeContext";

const Welcome = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark"
          ? " bg-slate-950 text-slate-500"
          : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
      } min-h-screen h-[89.05vh] lg:h-[90.7vh] flex items-center justify-center`}
    >
      <div className="flex flex-col text-center space-y-8 w-[95%]">
        <h1 className="flex flex-row text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-green-400 via-pink-900 to-red-400">
          Welcome <span>&nbsp;to&nbsp;</span> TechAid
        </h1>
        <p className="">
          Get help and share your knowledge with a community of developers.
        </p>
        <Link
          to="/questions"
          className={`w-fit mx-auto text-lg hover:${
            theme === "dark" ? "text-slate-200" : "text-red-600"
          } px-4 py-2 rounded-md border-[1px] border-slate-700`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
