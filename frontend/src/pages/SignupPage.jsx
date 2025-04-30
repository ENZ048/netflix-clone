import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSigup = (e) => {
    e.preventDefault();
    console.log(email, username, password);
  }
  return (
    <div className="hero-bg w-full h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix Logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-4xl font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSigup}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>

              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="example@gmail.com"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>

              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Example123"
                id="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>

              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700 cursor-pointer"
              
            >
              Sign Up
            </button>

            <div className="text-center text-gray-400">
              Aleardy have a account?{" "}
              <Link to={"/login"} className="text-red-500 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
