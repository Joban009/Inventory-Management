import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { RiProgress7Line } from "react-icons/ri";




const rightSideBar = () => {
  return (
    <div className="w-9/12 h-screen p-4 bg-gray-200">
      <div className="header m-3 flex items-center justify-between">
        <div className="flex items-center gap-2 border-1 rounded-md w-2/3">
          <IoIosSearch className="ml-2" />
          <input
            type="text"
            className="w-full p-2 rounded-md border-none"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center gap-4">
          <button>
            <IoMdNotificationsOutline className="text-2xl" />
          </button>
          <button>
            <MdDarkMode className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="content m-3 flex items-center justify-between">
        <div className="left">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-sm text-gray-400">
            {" "}
            Real-time overview of your warehouse stock and catalog.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 bg-white text-black py-2 px-4 rounded-md">
            <MdDownload />
            <p>Export</p>
          </button>
          <button className="flex items-center gap-2 border border-blue-400 bg-blue-500 text-white py-2 px-4 rounded-md">
            <IoIosAdd />
            <p>Add New Item</p>
          </button>
        </div>
      </div>
      <div className="flex gap-2 m-3 ">
        <div className="w-1/4 h-auto bg-white p-4 rounded-md shadow-md">
          <h2 className="text-l text-gray-500 mb-2">Total Items</h2>
          <p className="text-xl font-bold">1240</p>
          <span className="text-sm text-green-600 ">Lorem ipsum dolor.</span>
        </div>
        <div className="w-1/4 h-auto bg-white p-4 rounded-md shadow-md">
          <h2 className="text-l text-gray-500 mb-2">Low Stock Alerts</h2>
          <p className="text-xl font-bold">12</p>
          <span className="text-sm text-green-600 ">Lorem ipsum dolor.</span>
        </div>
        <div className="w-1/4 h-auto bg-white p-4 rounded-md shadow-md">
          <h2 className="text-l text-gray-500 mb-2">Out of Stock</h2>
          <p className="text-xl font-bold">5</p>
          <span className="text-sm text-green-600 ">Lorem ipsum dolor.</span>
        </div>
        <div className="w-1/4 h-auto bg-white p-4 rounded-md shadow-md">
          <h2 className="text-l text-gray-500 mb-2">Inventory Value</h2>
          <p className="text-xl font-bold">$45,200</p>
          <span className="text-sm text-green-600 ">Lorem ipsum dolor.</span>
        </div>
      </div>
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
}

export default rightSideBar
