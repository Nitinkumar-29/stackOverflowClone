import React, { useContext } from "react";
import HomeSidebar from "../components/HomeSidebar";
import { Outlet } from "react-router-dom";
import ThemeContext from "../Context/Theme/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{ height: "calc(100vh - 60px)" }}
      className={`relative flex flex-col-reverse lg:flex-row justify-center ${
        theme === "dark"
          ? "bg-slate-950 text-slate-500"
          : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
      } mx-auto w-full lg:space-x-12`}
    >
      <div
        className={`absolute bottom-0 lg:static lg:mb-0 w-full lg:w-[16%] lg:h-full lg:border-r-[1px]`}
      >
        <HomeSidebar />
      </div>
      <div className="h-full w-full lg:w-[80%] pb-10 lg:pb-0 lg:pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
