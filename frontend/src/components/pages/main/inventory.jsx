import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { RiProgress7Line } from "react-icons/ri";
import AddItems from "../../addItems";
import Navbar from "../../navbar";
import InventoryStick from "../../inventoryStock";


const inventory = () => {
  const [showModel , setShowModel] = useState(false);
 
    

  return (
    <div className="w-full h-screen p-4 bg-gray-200">


      <Navbar />


      <div className="content m-3 flex items-center justify-between">
        <div className="left">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-sm text-gray-400">
            Real-time overview of your warehouse stock and catalog.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 bg-white text-black py-2 px-4 rounded-md">
            <MdDownload />
            <p>Export</p>
          </button>
          <button className="flex items-center gap-1 bg-blue-500 p-[5px] rounded-md text-white" onClick={()=> setShowModel(true)}>
            <IoIosAdd />
            <p>Add New Item</p>
          </button>
          {showModel && <AddItems onClose={()=> setShowModel(false)} />}
        </div>
      </div>
      <InventoryStick />
      <div className="m-3 bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between m-3">
          <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
          <div className="flex items-center gap-4 text-xl">
            <MdFilterList />
            <MdOutlineRotateLeft />
          </div>
        </div>
        <div className="product-table">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-200 h-10 w-full text-[12px]">
              <tr>
                <th>PRODUCT NAME</th>
                <th>SKU</th>
                <th>CATEGORY</th>
                <th>STOCK LEVEL</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[11px] ">
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
              <tr className="h-10">
                <td>
                  <FaHeadphones />
                </td>
                <td>Wireless Headphones</td>
                <td>Electronics</td>
                <td>
                  <RiProgress7Line />
                </td>
                <td>$150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer className="flex items-center justify-between m-3 p-4 bg-gray-100 rounded-md">
        <div className="text-sm text-gray-600">
          <p>$copy. 2024 InvTrack Systems Inc. All right reserved.</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Help Centre</p>
        </div>
      </footer>
    </div>
  );
};


export default inventory;
