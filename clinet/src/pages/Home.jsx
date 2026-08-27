// components/NewsHeader.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const formDate = () => {
    const now = new Date();

    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${day}, ${date} ${month} ${year} · DAILY EDITION`;
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 overflow-hidden">
      {/* Optional decorative glow (background) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full text-center text-white">
        {/* Top bar: date + EST */}
        <div className="flex flex-col items-center text-sm tracking-widest text-gray-400 border-b border-gray-700 pb-3 mb-6">
          <span>{formDate()}</span>
          <span className="hidden sm:inline">EST. 2026</span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            WebDev
          </span>
          <br className="sm:hidden md:block" />
          <span className="text-white">Times</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mt-5 leading-relaxed">
          Latest news from the world of Web Development and AI — every day,{" "}
          <br className="hidden sm:block" />
          every update.
        </p>

        {/* Powered by */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-gray-400">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-gray-500" />
          <span>Powered by</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            GROQ AI
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-gray-500" />
        </div>

        {/* Call to action */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white text-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105 active:scale-95">
            <Link to="/news" className="relative z-10">
              Read Today's News
            </Link>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-0" />
          </button>
          <p className="text-sm text-gray-400 tracking-wide flex items-center gap-2">
            <span className="text-green-400 font-bold text-lg">+</span>
            News pre-loaded — instant access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
