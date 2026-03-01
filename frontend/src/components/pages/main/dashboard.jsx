import React from "react";
import Navbar from "../../navbar";
import InventoryStick from "../../inventoryStock";
import { MdDownload } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import AddItems from "../../addItems";
import { useState } from "react";
import Chart from "react-apexcharts";
import StockTrendChart from "../../charts/stockTrendChart";
import { IoMdAddCircleOutline } from "react-icons/io";

const dashboard = () => {
  return (
    <div className="max-w-screen max-h-screen">
      <Navbar />
      <div className="content m-3 flex items-center justify-between">
        <div className="left">
          <h1 className="text-2xl font-bold">Inventory Overview</h1>
          <p className="text-sm text-gray-400">
            High-level insits into your stock levels and warehouse performance.
          </p>
        </div>
      </div>
      <InventoryStick />

      <div className="flex">
        <div className="w-2/3 h-auto bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between m-3">
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold ">Stock Trends</h2>
              <p className="text-sm text-gray-500">
                Inventory movement over the last 7 days
              </p>
            </div>
            <div className="items-center gap-4 text-sm text-gray-500">
              <select
                name="days"
                id="days-select"
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
          </div>
          <div className="chart w-full flex justify-center">
            <div className="w-full max-w-2xl h-auto">
              <StockTrendChart />
            </div>
          </div>
        </div>
        <div className="w-1/3 h-auto bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between ">
            <div className="left">
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="right text-sm text-blue-500">
              <p>View All</p>
            </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-md card">
                <div className="left">
                  <IoMdAddCircleOutline className="text-xl bg-green-500 rounded-full text-white shadow-xl" />
                </div>
                <div className="right">
                  <h3>Stock Added: PH-102</h3>
                  <p>50 units added to Premium Headphones.</p>
                  <span>2 MINS AGO</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-md">
                <div className="left">
                  <IoMdAddCircleOutline className="text-xl bg-green-500 rounded-full text-white shadow-xl" />
                </div>
                <div className="right">
                  <h3>Stock Added: PH-102</h3>
                  <p>50 units added to Premium Headphones.</p>
                  <span>2 MINS AGO</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-md">
                <div className="left">
                  <IoMdAddCircleOutline className="text-xl bg-green-500 rounded-full text-white shadow-xl" />
                </div>
                <div className="right">
                  <h3>Stock Added: PH-102</h3>
                  <p>50 units added to Premium Headphones.</p>
                  <span>2 MINS AGO</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-md">
                <div className="left">
                  <IoMdAddCircleOutline className="text-xl bg-green-500 rounded-full text-white shadow-xl" />
                </div>
                <div className="right">
                  <h3>Stock Added: PH-102</h3>
                  <p>50 units added to Premium Headphones.</p>
                  <span>2 MINS AGO</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
