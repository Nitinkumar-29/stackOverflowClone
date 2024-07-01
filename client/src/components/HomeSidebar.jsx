import React, { useContext } from "react";
import { FaQuestion, FaSave, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "../Context/Theme/ThemeContext";

const HomeSidebar = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`flex lg:flex-col items-center lg:items-end  h-12 sm:mb-4 lg:h-full  w-full justify-around lg:justify-start lg:pt-6 ${
          theme === "dark"
            ? " bg-slate-950 text-slate-500"
            : "bg-gradient-to-bl  from-red-100 via-violet-200 to-green-100 text-black"
        }`}
      >
        <div className="flex items-center lg:flex-col lg:items-start  h-12 lg:h-full  w-full lg:w-40 justify-around lg:justify-start lg:pt-6 lg:space-y-4">
          <span className="lg:w-32">
            <Link
              to="/questions"
              className={`flex lg:justify-center items-center space-x-2 ${
                location.pathname === "/questions"
                  ? ""
                  : `lg:hover:${theme === "dark" ? "bg-gray-700" : "bg-white"}`
              } w-full py-2 px-2 ${
                location.pathname === "/questions"
                  ? `lg:${theme === "dark" ? "bg-gray-800" : "bg-white"}`
                  : "bg-transparent"
              } ${
                location.pathname === "/questions" ? "font-bold" : "font-normal"
              } cursor-pointer rounded-l-md`}
            >
              <FaQuestion size={20} />
              <span className="hidden lg:flex">Questions</span>
            </Link>
          </span>
          <span className="lg:w-32">
            <Link
              to="/saved"
              className={`flex items-center lg:justify-center space-x-2 ${
                location.pathname === "/saved"
                  ? ""
                  : `lg:hover:${theme === "dark" ? "bg-gray-700" : "bg-white"}`
              } ${
                location.pathname === "/saved"
                  ? `lg:${theme === "dark" ? "bg-gray-800" : "bg-white"}`
                  : "bg-transparent"
              } ${
                location.pathname === "/saved" ? "font-bold" : "font-normal"
              } cursor-pointer rounded-l-md`}
            >
              <FaSave size={20} />
              <span className="hidden lg:flex">Saved</span>
            </Link>
          </span>
          <span className="lg:w-32">
            <Link
              to="/users"
              className={`flex items-center lg:justify-center space-x-2 ${
                location.pathname === "/users"
                  ? ""
                  : `lg:hover:${theme === "dark" ? "bg-gray-700" : "bg-white"}`
              } ${
                location.pathname === "/users"
                  ? `lg:${theme === "dark" ? "bg-gray-800" : "bg-white"}`
                  : "bg-transparent"
              } ${
                location.pathname === "/users" ? "font-bold" : "font-normal"
              } cursor-pointer rounded-l-md`}
            >
              <FaUsers size={20} />
              <span className="hidden lg:flex">Users</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeSidebar;
