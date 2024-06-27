import React from "react";
import HomeSidebar from "../components/HomeSidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLinkClick = (key) => {
    navigate(key);
  };
  return (
    <div className="flex justify-center bg-slate-950 text-white mx-auto h-[89.15vh] w-full">
      <div className="flex w-[90%] space-x-12">
        <div className="w-[16%] h-full border-r-2">
          <HomeSidebar onLinkClick={handleLinkClick}></HomeSidebar>
        </div>
        <div className="w-[84%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
