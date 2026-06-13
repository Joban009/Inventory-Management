import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../../services/api.js";

const NavItem = ({ to, icon, label, onNavigate }) => {
  const Icon = icon;
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <button
      type="button"
      onClick={() => onNavigate(to)}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${
          active ? "text-blue-600" : "text-gray-500"
        }`}
      />
      {label}
    </button>
  );
};

const LeftSideBar = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [orgname, setOrgname] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setName(storedUser.name || "");
      setOrgname(storedUser.org_name || "");
    }

    authService
      .check()
      .then((res) => {
        if (res.data.status === "success") {
          setName(res.data.name);
          setOrgname(res.data.orgName);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col gap-8 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm">
            <LuPackage className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight text-gray-900">
              {orgname}
            </h1>
            <p className="text-xs text-gray-500">Enterprise Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <NavItem
            to="/dashboard"
            icon={MdDashboard}
            label="Dashboard"
            onNavigate={navigate}
          />
          <NavItem
            to="/inventory"
            icon={LuPackage}
            label="Inventory"
            onNavigate={navigate}
          />
          <NavItem
            to="/report"
            icon={TbReportAnalytics}
            label="Reports"
            onNavigate={navigate}
          />
          <NavItem
            to="/supplier"
            icon={MdPeopleAlt}
            label="Suppliers"
            onNavigate={navigate}
          />
        </nav>

        <div className="border-t border-gray-200 pt-4">
          <NavItem
            to="/setting"
            icon={IoMdSettings}
            label="Settings"
            onNavigate={navigate}
          />
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 shrink-0 rounded-full bg-blue-500 ring-2 ring-white"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {name}
            </p>
            <p className="truncate text-xs text-gray-500">Warehouse Lead</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <IoIosLogOut className="h-5 w-5 text-gray-500" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default LeftSideBar;
