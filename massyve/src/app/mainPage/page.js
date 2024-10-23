/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSelf } from "../../../services/userServices";
import { Player } from "@lottiefiles/react-lottie-player";

export default function MainPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace("/");
    } else {
      const preventBack = () => {
        window.history.pushState(null, "", window.location.href);
      };
      preventBack();
      const preventBackNavigation = (event) => {
        event.preventDefault();
        preventBack();
      };
      window.addEventListener("popstate", preventBackNavigation);

      return () => {
        window.removeEventListener("popstate", preventBackNavigation);
      };
    }
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await getSelf(token);
        setUser(response.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.replace("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 p-4 md:p-8">
      {/* Lottie Animation on the left side */}
      <div className="flex w-full md:w-1/2 items-center justify-center mb-8 md:mb-0">
        <Player
          autoplay
          loop
          src="/person.json"
          style={{ height: "400px", width: "400px" }}
        ></Player>
      </div>

      {/* User details card on the right side */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">
          Welcome, {user.fullName}!
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-lg mb-4 text-gray-700">
          <strong>Birthdate:</strong>{" "}
          {new Date(user.birthdate).toLocaleDateString()}
        </p>
        <div className="text-lg mb-4 text-gray-700">
          <strong>Your hobbies are:</strong>{" "}
          <ul className="list-disc list-inside text-gray-600">
            {user.hobbies.map((hobby, index) => (
              <li key={index} className="font-medium">
                {hobby}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xl font-bold text-gray-800">
          Keep enjoying your hobbies and stay awesome!
        </p>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
