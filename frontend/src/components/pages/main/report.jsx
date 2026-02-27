import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { SlCalender } from "react-icons/sl";
import { FaFilePdf } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import Navbar from "../../navbar"
import { CiMenuKebab } from "react-icons/ci";
import StockTrendChart from "../../charts/stockTrendChart";
import { GoDot } from "react-icons/go";
import StockByCat from "../../charts/stockByCat";


const report = () => {
  return (
    <div className="allContent">
      <Navbar />
      <div className="flex justify-between mt-2 ml-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">
            Insightful data visualizations and movement logs.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 border rounded px-2 text-sm">
            <SlCalender />
            Jan 1, 2024-Mar 31, 2024
          </div>
          <div className="flex items-center gap-1 border rounded px-2 text-sm">
            <FaFilePdf />
            PDF
          </div>
          <div className="flex items-center gap-1 p-2 border rounded text-sm">
            <FaFileCsv />
            CSV
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-3 mt-3">
        <div className="bg-white p-2 rounded shadow h-[350px] overflow-hidden">
          <div className="flex items-csnter justify-between mx-2">
            <p className="font-bold">Stock by Category</p>
            <CiMenuKebab />
          </div>
          <div className="p-2"><StockTrendChart/></div>
        </div>
        <div className="gap-2">
          <div className="flex items-center justify-between mx-2">
            <p className="font-bold">Inventory Value Over Time</p>
            <GoDot />
          </div>
          <div className="p-2 h-full"><StockByCat/></div>
      </div>
    </div>
    </div>
  );
};

export default report;
