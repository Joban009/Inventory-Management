import React from "react";
import LeftSideBar from "./leftSide/leftSideBar";
import RightSideBar from "./rightSide/rightSideBar";
import "./mainContainer.css";

const MainContainer = () => {
  return (
    <div className="flex ">
      <LeftSideBar />
      <RightSideBar />
    </div>
  );
};

export default MainContainer;
