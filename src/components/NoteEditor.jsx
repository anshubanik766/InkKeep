// src/components/NoteEditor.jsx
import React, { useState } from "react";

const NoteEditor = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ title, content, date: new Date().toLocaleString() });
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <input
        type="text"
        placeholder="Note Title"
        className="border p-2 w-full mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note..."
        className="border p-2 w-full h-32 mb-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Note
      </button>
    </div>
  );
};

export default NoteEditor;
