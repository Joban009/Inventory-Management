import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

const navbar = () => {
  return (
    <div>
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
    </div>
  );
};

export default navbar;
