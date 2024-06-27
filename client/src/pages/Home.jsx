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
    <div className="flex justify-center bg-slate-950 text-slate-500 mx-auto h-[90.7vh] w-full">
      <div className="flex w-[90%] space-x-6">
        <div className="w-[12%] h-full border-r-[1px] border-slate-500">
          <HomeSidebar onLinkClick={handleLinkClick}></HomeSidebar>
        </div>
        <div className="w-[86%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
