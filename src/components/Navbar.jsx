// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* App Title */}
      <h1 className="text-2xl font-bold">Note Keeper</h1>

      {/* Links (optional) */}
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
