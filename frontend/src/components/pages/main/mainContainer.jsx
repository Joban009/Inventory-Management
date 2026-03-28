import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import Footer from "../../Footer";

const MainContainer = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <LeftSideBar />
      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainContainer;
