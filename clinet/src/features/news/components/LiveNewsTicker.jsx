import React, { useState, useEffect, useRef } from "react";

// Sample headlines – replace with your API data
const NEWS_POOL = [
  "🚀 Groq AI achieves 1,000 tokens per second on new LPU",
  "📱 WebDev Times launches interactive tutorial series",
  "🌐 CSS Container Queries now supported in all major browsers",
  "🧠 AI-powered code completion reaches 90% accuracy",
  "⚡ Next.js 15 introduces partial pre-rendering",
  "🎨 Tailwind CSS v4 brings native CSS nesting",
  "📦 React 19 stable release scheduled for Q4 2026",
  "🔒 New security features in the latest ECMAScript update",
];

function LiveNewsTicker() {
  const [headlines, setHeadlines] = useState(NEWS_POOL);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef(null);

  // Simulate new headlines arriving: every 6 seconds, rotate the list
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlines((prev) => {
        // Move first item to the end (or shuffle)
        const newList = [...prev];
        const first = newList.shift();
        newList.push(first);
        return newList;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto  border border-t-gray-100 overflow-hidden">
      {/* Ticker container: live badge + scrolling headlines */}
      <div className="flex items-center gap-4 px-4 py-2">
        {/* Left: Red LIVE badge */}
        <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Live
        </div>

        {/* Scrolling ticker */}
        <div className="relative flex-1 overflow-hidden h-8">
          <div
            ref={tickerRef}
            className="absolute whitespace-nowrap flex gap-12 animate-scroll"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {/* Duplicate headlines for seamless looping */}
            {[...headlines, ...headlines].map((headline, index) => (
              <span key={index} className="text-sm text-gray-800 font-medium">
                {headline}
                <span className="mx-4 text-gray-300">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: max-content;
        }
        /* Pause on hover (optional) */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default LiveNewsTicker;
