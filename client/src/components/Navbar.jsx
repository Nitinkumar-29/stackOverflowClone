import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaBell, FaMoon, FaSun, FaUser } from "react-icons/fa";
import AuthContext from "../Context/Authentication/AuthContext";
import ThemeContext from "../Context/Theme/ThemeContext";

const Navbar = () => {
  const { token, loggedUserData, host } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`z-10 sticky top-0 w-full ${
          theme === "dark"
            ? "bg-slate-950 text-slate-500"
            : "bg-gradient-to-tl from-red-100 via-violet-200 to-green-100 text-gray-800"
        } flex justify-center border-b-[1px] border-b-gray-700 py-3`}
      >
        <div className="flex justify-between w-[90%] items-center h-12">
          {/* navbar icon and hamburger */}
          <div className="flex h-full items-center space-x-6">
            <Link className="flex space-x-4 items-center " to="/">
              <img
                className="h-12 rounded-full"
                src={`/images/logo.png`}
                alt=""
              />
              <span className="hidden md:flex tracking-wider text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-bl from-red-400 via-violet-900 to-green-400">
                TechAid
              </span>
            </Link>
          </div>
          {/* authentication buttons */}

          <div className="flex items-center h-full space-x-3">
            {!token ? (
              <div className="flex justify-center items-center space-x-3 h-full">
                <Link
                  to="/login"
                  className="border-[1px] border-slate-700 px-4 py-2 rounded-md hover:text-red-600 hover:bg-white"
                >
                  Log in
                </Link>

                <Link
                  to="/signUp"
                  className="hidden md:flex border-[1px] border-slate-700 px-4 py-2 rounded-md hover:text-red-600 hover:bg-white"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full space-x-4">
                <div className="flex justify-between space-x-3 items-center h-fit">
                  <Link to="/userProfile" className="cursor-pointer">
                    {loggedUserData?.user?.profileImage?.data ? (
                      <img
                        className={`h-10 w-10 rounded-full border-[1px] ${
                          theme === "dark"
                            ? " border-slate-700"
                            : "border-slate-200"
                        }`}
                        src={`${host}/${loggedUserData?.user?.profileImage?.data}`}
                        alt=""
                      />
                    ) : (
                      <FaUser className="h-6 w-6" />
                    )}
                  </Link>
                  <span className="cursor-pointer">
                    <FaBell className="h-6 w-6" />
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="flex items-center w-fit p-1 border-[1px] border-slate-700 h-fit rounded-md"
            >
              {theme === "dark" ? (
                <FaSun className="m-2" />
              ) : (
                <FaMoon className="m-2" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
