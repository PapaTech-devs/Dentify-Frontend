import { useAuth } from "../hooks/contextHooks";
import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../hooks/userHooks";

export default function Navbar() {
  const { authUser, signMeOut, loading } = useAuth();
  const [, setUserData] = useUserData();

  if (loading)
    return (
      <nav className="h-20 bg-gray-300 flex items-center justify-between px-4 md:px-10">
        <p>Loading please wait</p>
      </nav>
    );

  return (
    <nav className="h-20 bg-gray-300 flex items-center justify-between px-4 md:px-10">
      <Link className="text-3xl font-bold" to="/">
        Dentify
      </Link>
      {!authUser ? (
        <div className="flex md:w-2/12 items-center space-x-2 justify-end">
          <Link className="text-lg mr-5" to="/login">
            Login
          </Link>
          <Link className="text-lg" to="/register">
            Register
          </Link>
        </div>
      ) : (
        <div className="flex md:w-2/12 items-center space-x-2 justify-end">
          {authUser.approved && (
            <Link className="text-lg mr-3" to="/dashboard">
              Dashboard
            </Link>
          )}
          <button
            onClick={async () => {
              await signMeOut();
              setUserData([]);
            }}
            className="text-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
