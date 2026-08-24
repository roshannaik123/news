import React, { useState } from "react";

const Navbar = () => {
  const [isLive, setIsLive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate async refresh
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLive((prev) => !prev); // toggle live status for demo
    }, 1200);
  };

  return (
    <nav className="w-full max-w-8xl mx-auto  bg-white shadow-lg  px-6 py-4 flex items-center justify-between flex-wrap gap-4 border border-gray-100">
      {/* -------- Left: Logo + Brand -------- */}
      <div className="flex  max-w-5xl mx-auto w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl text-white text-2xl font-bold shadow-md">
            WT
          </div>
          {/* Brand text */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
              WebDev <span className="text-blue-600">Times</span>
            </h1>
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
              <span>Powered by</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                Groq AI
              </span>
            </p>
          </div>
        </div>
        {/* -------- Right: Live badge + Refresh button -------- */}
        <div className="flex items-center gap-4">
          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-green-50 px-3.5 py-2 rounded-full border border-green-200">
            <span className="relative flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 ${
                  isLive ? "visible" : "invisible"
                }`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${
                  isLive ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </span>
            <span className="text-sm font-semibold text-green-700">
              {isLive ? "LIVE" : "OFFLINE"}
            </span>
          </div>

          {/* Refresh button - clearly visible */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Refresh"
          >
            <svg
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
