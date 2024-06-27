import React from "react";
import { FaQuestion, FaSave, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const HomeSidebar = ({ dropdown, share, teams, hamburgerMenuDisplay }) => {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col min-h-full items-start py-4 w-full space-y-2 text-slate-500">
        <div className="text-sm flex flex-col items-start w-full space-y-1">
          <Link
            to="/questions"
            className={`flex space-x-2 items-center h-fit ${
              location.pathname === "/questions" ? "" : "hover:bg-gray-700"
            } w-full py-2 px-2 ${
              location.pathname === "/questions"
                ? "bg-slate-800"
                : "bg-transparent"
            } ${
              location.pathname === "/questions" ? "font-bold" : "font-normal"
            } cursor-pointer rounded-l-md`}
          >
            <FaQuestion />
            <span>Questions</span>
          </Link>
        </div>
        <div className="text-sm flex flex-col items-start w-full space-y-1">
          <Link
            to="/saved"
            className={`flex items-center h-fit space-x-2 w-full py-2 px-2 ${
              location.pathname === "/saved" ? "" : "hover:bg-gray-700"
            } ${
              location.pathname === "/saved" ? "bg-slate-800" : "bg-transparent"
            } ${
              location.pathname === "/saved" ? "font-bold" : "font-normal"
            } cursor-pointer rounded-l-md`}
          >
            <FaSave />
            <span>Saved</span>
          </Link>
          <Link
            to="/users"
            className={`flex items-center h-fit space-x-2 w-full py-2 px-2 ${
              location.pathname === "/users" ? "" : "hover:bg-gray-700"
            } ${
              location.pathname === "/users" ? "bg-slate-800" : "bg-transparent"
            } ${
              location.pathname === "/users" ? "font-bold" : "font-normal"
            } cursor-pointer rounded-l-md`}
          >
            <FaUsers />
            <span>Users</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeSidebar;
