import React from "react";

const categories = [
  "All",
  "AI Models",
  "Dev Tools",
  "Frontend",
  "Backend",
  "Design",
  "Strategy",
];

const CategoryTabs = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition ${
            selectedCategory === category
              ? "bg-white text-black"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
