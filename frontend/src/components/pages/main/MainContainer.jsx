import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../common/LeftSideBar";
import Footer from "../../common/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../../../services/api.js";

const MainContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .check()
      .then((res) => {
        if (res.data.status !== "success" && !localStorage.getItem("user")) {
          localStorage.removeItem("isLoggedIn");
          navigate("/");
        }
      })
      .catch(() => {
        if (!localStorage.getItem("user")) {
          localStorage.removeItem("isLoggedIn");
          navigate("/");
        }
      });
  }, [navigate]);
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
