"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Link from "next/link";
import { registerUser } from "../../../services/userServices";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [hobby, setHobby] = useState("");
  const [hobbies, setHobbies] = useState([]);
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
      const data = await registerUser({
        fullName,
        username,
        password,
        birthdate,
        hobbies,
      });

      const token = data.token;
      localStorage.setItem("authToken", token);
      toast.success("Registration successful!", { theme: "colored" });
      setTimeout(() => {
        router.replace("/mainPage");
      }, 1500);
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed: " + err.message, { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddHobby = () => {
    if (hobby.trim()) {
      setHobbies([...hobbies, hobby.trim()]);
      setHobby("");
    }
  };

  const handleRemoveHobby = (removedHobby) => {
    setHobbies(hobbies.filter((h) => h !== removedHobby));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 overflow-hidden">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
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
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  fullName ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Full Name
              </label>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="peer w-full mb-2 px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Username"
                required
              />
              <label
                htmlFor="username"
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  username ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Username
              </label>
            </div>

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
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  password ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Password
              </label>
            </div>

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
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  confirmPassword ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Confirm Password
              </label>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                id="hobby"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                className="peer w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Hobby"
              />
              <label
                htmlFor="hobby"
                className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-18px] peer-focus:text-sm peer-focus:text-blue-500 ${
                  hobby ? "top-[-18px] text-sm text-blue-500" : ""
                }`}
              >
                Hobby
              </label>
              <button
                type="button"
                onClick={handleAddHobby}
                className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
              >
                Add Hobby
              </button>
              <div className="flex flex-wrap gap-2 mt-4">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {hobby}
                    <button
                      type="button"
                      onClick={() => handleRemoveHobby(hobby)}
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mb-4">
              <DatePicker
                label="Select your birthdate"
                value={birthdate}
                onChange={(newValue) => setBirthdate(newValue)}
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    className="peer w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Birthdate"
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </form>

          <ToastContainer position="top-right" />
        </div>

        {/* Animation Section */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <Player
            autoplay
            loop
            src="/animation.json"
            style={{ height: "400px", width: "400px" }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
