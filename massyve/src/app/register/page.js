"use client"; // Make sure this is a client-side component

import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Link from "next/link"; // To link to the login page

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative mb-4">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="peer w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-2"
                placeholder="Full Name"
                required
              />
              <label
                htmlFor="fullName"
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  fullName ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full mb-2 px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-3 py-2 mb-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

            {/* Confirm Password */}
            <div className="relative mb-4">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer w-full px-3 mb-2 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Confirm Password"
                required
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  confirmPassword ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Confirm Password
              </label>
            </div>

            {/* Birthdate (DatePicker remains the same) */}
            <div className="relative mb-4">
              <DatePicker
                label="Select your birthdate"
                value={birthdate}
                onChange={(newValue) => setBirthdate(newValue)}
                fullWidth
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    className="peer w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Birthdate"
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>

            {/* Already have an account? */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </LocalizationProvider>
  );
}
