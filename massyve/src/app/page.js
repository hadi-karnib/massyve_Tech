"use client";

import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login to Your Account
        </h1>
        <form>
          {/* Email */}
          <div className="relative mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-3 mb-2 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-3 top-2 text-gray-500 transition-all duration-200
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                email ? "top-[-18px] text-sm text-blue-500" : ""
              }`}
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-3 mb-2 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className={`absolute left-3 top-2 text-gray-500 transition-all duration-200
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                password ? "top-[-18px] text-sm text-blue-500" : ""
              }`}
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign In
            </button>
          </div>

          {/* Sign up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
