import React from "react";

const NewsCard = ({ allnews }) => {
  return (
    <article className="rounded-2xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-600 transition">
      <div className="mb-3">
        <span className="text-sm text-purple-400">{allnews.category}</span>
      </div>

      <h2 className="text-xl font-bold mb-3">{allnews.title}</h2>

      <p className="text-gray-400 mb-4">{allnews.summary}</p>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{allnews.source}</span>
        <span>{allnews.time}</span>
      </div>
    </article>
  );
};

export default NewsCard;
