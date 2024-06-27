import React, { useContext, useState } from "react";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import AuthContext from "../Context/Authentication/AuthContext";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const { credentials, setCredentials, login } = useContext(AuthContext);

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[89.15vh] bg-slate-950 text-white">
        <div className="flex flex-col items-center space-y-8 h-fit w-[90%]">
          <div className="flex flex-col space-y-3 items-center">
            <div className="flex space-x-4">
              <img
                src={`/images/logo.png`}
                className="rounded-full h-8 w-8"
                alt=""
              />
              <span className="tracking-wider text-2xl font-extrabold bg-clip-text inline-block text-transparent bg-gradient-to-tr from-green-400 via-pink-900 to-red-400">
                TechAid
              </span>
            </div>
            <div className="space-y-3 flex flex-col text-sm">
              <Link
                to="/"
                className="flex items-center px-3 py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaGoogle />
                </span>
                &nbsp; Log in with Google
              </Link>
              <Link
                to="/"
                className="flex items-center px-3 bg-black text-white py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaGithub />
                </span>
                &nbsp; Log in with GitHub
              </Link>
              <Link
                to="/"
                className="flex items-center px-3 bg-[#385499] text-white py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaFacebook />
                </span>
                &nbsp; Log in with Facebook
              </Link>
            </div>
          </div>
          {/* login form code */}
          <div className="w-72 flex flex-col items-center">
            <form
              className="space-y-4 flex flex-col items-start w-full p-5 rounded-md bg-inherit text-white border-[1px] border-gray-200"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col items-start w-full">
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:outline-none focus:placeholder:text-blue-500 bg-inherit rounded-md py-1 px-2 border-[1px] border-gray-500 w-full"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="w-full justify-between flex items-center">
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <span className="text-xs cursor-pointer text-blue-500">
                    Forgot password?
                  </span>
                </div>
                <input
                  className=" focus:placeholder:text-blue-500 bg-inherit focus:outline-none p-1 border-[1px] rounded-md  w-full"
                  type={passwordType}
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <div className="text-sm my-1 items-center flex space-x-1">
                  <input onClick={togglePasswordType} type="checkbox" />
                  <span> Show Password</span>
                </div>
              </div>
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-sm my-1 text-white w-full py-2 rounded-lg"
              >
                Log in
              </button>
            </form>
          </div>
          {/* other links */}
          <div className="flex items-center justify-center w-fit mx-auto space-x-1 text-sm">
            <span>Don't have an account?</span>
            <Link to="/signUp" className="text-blue-500 text-xs">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
