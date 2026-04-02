import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../common/LeftSideBar";
import Footer from "../../common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/backend/auth_check.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status !== "success") {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);
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
