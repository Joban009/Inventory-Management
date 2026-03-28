import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

const Navbar = ({ searchPlaceholder = "Search products, SKU or category..." }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-slate-50/95 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="mx-auto flex max-w-2xl flex-1 items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2.5">
          <IoIosSearch className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
          <input
            type="search"
            className="ml-2 w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
            placeholder={searchPlaceholder}
            aria-label="Search"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Notifications"
          >
            <IoMdNotificationsOutline className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Dark mode"
          >
            <MdDarkMode className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
