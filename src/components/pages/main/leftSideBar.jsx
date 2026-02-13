import React from 'react'
import { MdInventory2 } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';




const leftSideBar = () => {
  
const navigate = useNavigate();

  return (
    <div className="w-3/12 bg-gray-200 h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="top">
          <div className="flex items-center gap-2">
            <MdInventory2 className="w-4" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">InvTrack</h1>
              <p className="text-sm text-gray-600">Enterprise Admin</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-auto gap-6 mt-10">
          <button className="flex items-center gap-2" onClick={()=>navigate("./dashboard")}>
            <MdDashboard />
            <p>Dashboard</p>
          </button>
          <button className="flex items-center gap-2" onClick={()=>navigate("./inventory")}>
            <LuPackage />
            <p>Inventory</p>
          </button>
          <button className="flex items-center gap-2" onClick={()=>navigate("./report")}>
            <TbReportAnalytics />
            <p>Reports</p>
          </button>
          <button className="flex items-center gap-2" onClick={()=>navigate("./supplier")}>
            <MdPeopleAlt />
            <p>Supplier</p>
          </button>
          <hr className="border-gray-400" />
          <button className="flex items-center gap-2" onClick={()=>navigate("./setting")}>
            <IoMdSettings />
            <p>Settings</p>
          </button>
        </div>
      </div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mt-10">
          <CgProfile className="text-7xl" />
          <div className="flex flex-col">
            <p className="font-bold text-xl">Joban Bajracharya</p>
            <p className="text-sm text-gray-400">Warehouse Lead</p>
          </div>
        </div>
        <div>
          <button className="flex items-center gap-2 justify-center content-center w-full mt-4 bg-gray-500 text-white py-2 rounded-md" onClick={()=>navigate("/")}>
            <IoIosLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default leftSideBar
