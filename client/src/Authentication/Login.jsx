import React, { useContext, useState } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

import { Link } from "react-router-dom";
import AuthContext from "../Context/Authentication/AuthContext";
import ThemeContext from "../Context/Theme/ThemeContext";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const { credentials, setCredentials, login } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

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
      <div
        className={`flex justify-center items-center max-h-screen h-[90.7vh] ${
          theme === "dark"
            ? " bg-slate-950 text-slate-500"
            : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 h-fit w-[90%]">
          {/* login form code */}
          <div className="p-3 w-full lg:w-72 flex flex-col items-center">
            <div className="my-5 text-2xl">LogIn</div>
            <form
              className="space-y-4 flex flex-col items-start w-full p-5 rounded-md bg-inherit border-[1px] border-slate-700"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col items-start w-full">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:outline-none focus:placeholder:text-blue-500 bg-inherit rounded-md py-1 px-2 border-[1px] border-slate-700 w-full"
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
                  <label className="font-semibold" htmlFor="password">
                    Password
                  </label>
                  <span className="text-xs cursor-pointer text-blue-500">
                    Forgot password?
                  </span>
                </div>
                <input
                  className=" focus:placeholder:text-blue-500 bg-inherit focus:outline-none p-1 border-[1px] border-slate-700 rounded-md  w-full"
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
                className="w-full mx-auto px-4 py-2 rounded-md border-[1px] border-slate-700"
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
