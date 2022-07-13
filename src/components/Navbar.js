import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-20 bg-gray-300 flex items-center justify-between px-4 md:px-10">
      <Link className="text-3xl font-bold" to="/">
        Dentify
      </Link>
      <div className="flex md:w-2/12 justify-between md:px-10">
        <Link className="text-lg mr-5" to="/login">
          Login
        </Link>
        <Link className="text-lg" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}
