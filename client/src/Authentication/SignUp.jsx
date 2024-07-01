import React, { useContext, useState } from "react";
import { FaEye, FaEyeDropper } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThemeContext from "../Context/Theme/ThemeContext";
import AuthContext from "../Context/Authentication/AuthContext";

const SignUp = () => {
  const {
    signUp,
    createAccountCredentials,
    setCreateAccountCredentials,
    error,isLoading
  } = useContext(AuthContext);

  const [passwordType, setPasswordType] = useState("password");

  const { theme } = useContext(ThemeContext);

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const onChange = (e) => {
    setCreateAccountCredentials({
      ...createAccountCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    signUp();
  };
  return (
    <>
      <div
        className={`flex items-center justify-center min-h-[90.7vh] ${
          theme === "dark"
            ? " bg-slate-950 text-slate-500"
            : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
        }`}
      >
        <div className="p-5 w-full lg:w-[70%] flex flex-col lg:flex-row space-y-2 lg:space-y-0 h-fit items-center my-10 justify-center">
          <div className="flex flex-col items-center space-y-6 w-full">
            {/* other links like google, faceboook, github to login */}
            <div className="flex md:hidden text-center">
              <span className="text-4xl">Create Account</span>
            </div>
            {/* signup page elements */}
            <form onSubmit={handleSignUp} className="flex flex-col items-center w-full">
              <div className="hidden md:flex m-6 text-center">
                <span className="text-4xl">Create Account</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full sm:w-[80%] md:w-full mx-auto md:mx-0 border-[1px] border-slate-700 p-4 rounded-md">
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="name">
                    Display name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    onChange={onChange}
                    required
                    value={createAccountCredentials.name}
                    className="border-[1px] border-slate-700 w-full bg-inherit rounded-md p-2 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="name">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Job title"
                    id="name"
                    name="jobTitle"
                    onChange={onChange}
                    required
                    value={createAccountCredentials.jobTitle}
                    className="border-[1px] border-slate-700 w-full bg-inherit rounded-md p-2 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={onChange}
                    required
                    value={createAccountCredentials.email}
                    className="border-[1px] border-slate-700 w-full bg-inherit rounded-md p-2 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="password">
                    Set Password
                  </label>
                  <div className="flex items-center border-[1px] border-slate-700 w-full p-2 rounded-md">
                    <input
                      type={passwordType}
                      id="password"
                      placeholder="Password"
                      name="password"
                      onChange={onChange}
                      required
                      value={createAccountCredentials.password}
                      className="w-full bg-inherit rounded-md focus:outline-none focus:placeholder:text-blue-500"
                    />
                    <span
                      className="cursor-pointer"
                      onClick={togglePasswordType}
                    >
                      {passwordType ? <FaEye /> : <FaEyeDropper />}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type={passwordType}
                    id="confirmPassword"
                    placeholder="Password"
                    name="confirmPassword"
                    onChange={onChange}
                    required
                    value={createAccountCredentials.confirmPassword}
                    className="border-[1px] border-slate-700 bg-inherit w-full rounded-md p-2 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full space-y-1">
                  <label className="font-semibold" htmlFor="name">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    id="name"
                    name="address"
                    onChange={onChange}
                    required
                    value={createAccountCredentials.address}
                    className="border-[1px] border-slate-700 w-full bg-inherit rounded-md p-2 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
              </div>
              {isLoading===false&&<span className="mt-3 text-red-700 text-sm">{error}</span>}
              <div className="flex flex-col items-center mx-auto w-full my-3">
                <button
                  type="submit"
                  className={`w-full my-5 py-2 ${
                    theme === "dark" ? "text-slate-500" : "text-black"
                  } border-[1px] border-slate-700 rounded-md mx-auto`}
                >
                  Sign up
                </button>
                <div className="flex items-center space-x-1">
                  <span>Already have an acccount? </span>
                  <Link to="/login" className="text-blue-500">
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
