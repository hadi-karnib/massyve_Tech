/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../services/userServices";
import { Player } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      const token = data.token;

      localStorage.setItem("authToken", token);

      toast.success("Login successful!", { theme: "colored" });

      setTimeout(() => {
        router.replace("/mainPage");
      }, 1500);
    } catch (err) {
      setError(err.message);
      toast.error("Login failed: " + err.message, { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
      {/* Container for both animation and form */}
      <div className="flex w-full max-w-4xl items-center justify-between p-8">
        {/* Lottie Animation on the right side */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <Player
            autoplay
            loop
            src="/animation.json"
            style={{ height: "400px", width: "400px" }}
          ></Player>
        </div>

        {/* Login form on the left */}
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Login to Your Account
          </h1>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full px-3 mb-2 py-2 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Username"
                required
                autoComplete="off"
              />
              <label
                htmlFor="username"
                className={`absolute left-3 top-2 text-white transition-all duration-200
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-white ${
                  username ? "top-[-18px] text-sm text-white" : ""
                }`}
              >
                Username
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-3 py-2 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
                required
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className={`absolute left-3 top-2 text-white transition-all duration-200
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-white ${
                  password ? "top-[-18px] text-sm text-white" : ""
                }`}
              >
                Password
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Sign up Link */}
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-300 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer position="top-right" />
    </div>
  );
}
