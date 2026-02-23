import React from "react";

const inventoryStock = () => {
  return (
    <div>
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
          <h2 className="text-l text-gray-500 mb-2">Total Inventory Value</h2>
          <p className="text-xl font-bold">$45,200</p>
          <span className="text-sm text-green-600 ">Lorem ipsum dolor.</span>
        </div>
      </div>
    </div>
  );
};

export default inventoryStock;
