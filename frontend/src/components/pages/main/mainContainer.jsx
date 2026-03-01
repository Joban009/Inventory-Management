import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./leftSideBar";
import Footer from "../../footer";

const MainContainer = () => {
  return (
    <div className="max-h-screen">
    <div className="flex">
      <LeftSideBar />
      <div className="flex flex-col h-screen w-full">
        <Outlet />
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default MainContainer;
