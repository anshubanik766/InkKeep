// src/components/TagSelector.jsx
import React from "react";

export default function TagSelector({ tags, selectedTag, onTagChange }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagChange(tag)}
          className={`px-3 py-1 rounded-full border text-sm ${
            selectedTag === tag
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
