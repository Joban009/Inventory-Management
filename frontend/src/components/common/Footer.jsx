import React from "react";

const Footer = () => {
  return (
    <footer className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-gray-500">
          © 2024 InvTrack Systems Inc. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="#"
            className="text-xs text-gray-500 transition-colors hover:text-gray-800"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs text-gray-500 transition-colors hover:text-gray-800"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-gray-500 transition-colors hover:text-gray-800"
          >
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
