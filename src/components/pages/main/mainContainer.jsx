import React from "react";
import { Outlet } from "react-router-dom";  
import LeftSideBar from "./leftSideBar";

const MainContainer = () => {
  return (
    <div className="flex ">
      <LeftSideBar />
      <Outlet /> 
    </div>
  );
};

export default MainContainer;
