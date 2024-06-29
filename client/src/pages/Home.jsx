import React, { useContext } from "react";
import HomeSidebar from "../components/HomeSidebar";
import { Outlet } from "react-router-dom";
import ThemeContext from "../Context/Theme/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{ height: "calc(100vh - 72px)" }}
      className={`relative flex flex-col-reverse justify-center ${
        theme === "dark"
          ? "bg-slate-950 text-slate-500"
          : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
      } mx-auto w-full`}
    >
      <div className="absolute bottom-0 w-full">
        <HomeSidebar />
      </div>
      <div className="h-full w-full pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
