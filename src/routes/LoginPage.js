import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/contextHooks";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({
    email: null,
    password: null,
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.toLowerCase()
    );
  };

  const handleSubmit = async () => {
    const errorObject = {
      email: null,
      password: null,
    };

    // check for email
    if (!validateEmail(email)) {
      errorObject.email = "Enter a valid email";
    } else {
      errorObject.email = null;
    }

    // check for password
    if (password.length === 0) {
      errorObject.password = "Please enter a password";
    } else {
      errorObject.password = null;
    }

    setError(errorObject);

    if (errorObject.email || errorObject.password) {
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found":
          errorObject.email = "User does not exists.";
          break;
        case "auth/wrong-password":
          errorObject.password = "Wrong password for the user";
          break;
        default:
          errorObject.email = "Internal server error.";
      }
      setError(errorObject);
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col mx-4 md:mx-0 px-12 py-10 w-full md:w-2/5 space-y-4 items-center border-2 rounded-sm">
        <p className="text-4xl font-bold py-5">Login</p>
        <input
          type="text"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
          className="w-full py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
        />
        {errors.email ? (
          <p className="text-red-500 font-semibold self-start">
            {errors.email}
          </p>
        ) : (
          <></>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(text) => setPassword(text.target.value)}
          className="w-full py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
        />
        {errors.password ? (
          <p className="text-red-500 font-semibold self-start">
            {errors.password}
          </p>
        ) : (
          <></>
        )}
        {loading ? (
          <button
            onClick={handleSubmit}
            disabled
            className="py-2 px-3 bg-green-500 w-full disabled:bg-slate-300 text-white text-lg font-semibold rounded-sm"
          >
            SignIn
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="py-2 px-3 bg-green-500 w-full text-white text-lg font-semibold rounded-sm"
          >
            SignIn
          </button>
        )}
        {loading ? (
          <Link
            to="/register"
            disabled
            className="py-2 px-3 w-full text-gray-500 disabled:text-gray-300  text-center underline text-lg font-semibold rounded-sm"
          >
            Create Account
          </Link>
        ) : (
          <Link
            to="/register"
            className="py-2 px-3 w-full text-gray-500 text-center underline text-lg font-semibold rounded-sm"
          >
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
}
