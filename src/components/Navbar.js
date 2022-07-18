import { useAuth } from "../hooks/contextHooks";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { authUser, signMeOut } = useAuth();

  return (
    <nav className="h-20 bg-gray-300 flex items-center justify-between px-4 md:px-10">
      <Link className="text-3xl font-bold" to="/">
        Dentify
      </Link>
      {!authUser ? (
        <div className="flex md:w-2/12 justify-between md:px-10">
          <Link className="text-lg mr-5" to="/login">
            Login
          </Link>
          <Link className="text-lg" to="/register">
            Register
          </Link>
        </div>
      ) : (
        <div className="flex md:w-2/12 justify-between items-center">
          <Link className="text-lg mr-3" to="/dashboard">
            Dashboard
          </Link>
          <button onClick={() => signMeOut()} className="text-lg">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
