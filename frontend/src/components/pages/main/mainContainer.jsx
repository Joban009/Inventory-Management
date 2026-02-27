import React from "react";
import { Outlet } from "react-router-dom";  
import LeftSideBar from "./leftSideBar";
import Footer from "../../footer";

const MainContainer = () => {
  return (
    <div className="flex">
      <LeftSideBar />
      <div className="flex flex-col h-screen">
      <Outlet />
      <Footer />
      </div> 
    </div>
  );
};

export default MainContainer;
