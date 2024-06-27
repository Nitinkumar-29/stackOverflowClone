import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaBell, FaUser } from "react-icons/fa";
import AuthContext from "../Context/Authentication/AuthContext";

const Navbar = () => {
  const { token, loggedUserData, imageHost } = useContext(AuthContext);

  return (
    <>
      <div className="z-10 sticky top-0 w-full bg-slate-950 text-white flex justify-center border-b-[1px] border-b-gray-300 py-3">
        <div className="flex justify-between w-[90%] items-center h-12">
          {/* navbar icon and hamburger */}
          <div className="flex h-full items-center space-x-6">
            <Link className="flex space-x-4 items-center " to="/">
              <img
                className="h-10 rounded-full"
                src={`/images/logo.png`}
                alt=""
              />
              <span className="tracking-wider text-2xl font-extrabold bg-clip-text inline-block text-transparent bg-gradient-to-tr from-green-400 via-pink-900 to-red-400">
                TechAid
              </span>
            </Link>
          </div>
          {/* authentication buttons */}
          {!token ? (
            <div className="flex justify-center items-center space-x-2 h-full">
              <Link
                to="/login"
                className="border-2 px-4 py-2 rounded-md hover:text-red-600 hover:bg-white"
              >
                Log in
              </Link>
              <Link
                to="/signUp"
                className="border-2 px-4 py-2 rounded-md hover:text-red-600 hover:bg-white"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full space-x-4">
              <div className="flex justify-between space-x-5 items-center h-fit">
                <Link to="/userProfile" className="cursor-pointer">
                  {loggedUserData?.user?.profileImage?.data ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`${imageHost}/${loggedUserData?.user?.profileImage?.data}`}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
