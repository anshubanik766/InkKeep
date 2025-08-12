import React, { useEffect, useState } from "react";
import { FaTimes, FaThumbtack } from "react-icons/fa";
import FontPicker from "./FontPicker";

const COLORS = [
  { name: "White", class: "bg-white" },
  { name: "Yellow", class: "bg-yellow-100" },
  { name: "Green", class: "bg-green-100" },
  { name: "Blue", class: "bg-blue-100" },
  { name: "Pink", class: "bg-pink-100" },
];

export default function NoteModal({ initial = null, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [color, setColor] = useState(initial?.color || "bg-white");
  const [font, setFont] = useState(initial?.font || "font-sans");
  const [pinned, setPinned] = useState(initial?.pinned || false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSave();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, title, content, color, font, pinned]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onSave({
      id: initial?.id,
      title,
      content,
      color,
      font,
      pinned,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden p-4 transform transition-all duration-300 scale-95 opacity-0 animate-scaleFadeIn ${color} dark:bg-gray-800`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {initial ? "Edit note" : "New note"}
          </h2>
          <div className="flex items-center gap-2">
            {/* Pin toggle */}
            <button
              onClick={() => setPinned((s) => !s)}
              className={`p-2 rounded-full transition-colors ${
                pinned
                  ? "text-yellow-500"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title="Pin note"
            >
              <FaThumbtack />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main editor */}
          <div className="md:col-span-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400"
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full mt-3 p-3 rounded border dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 ${font}`}
              rows={8}
              placeholder="Write your note..."
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-3">
            {/* Colors */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Color
              </p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.class)}
                    className={`w-8 h-8 rounded ${c.class} border ${
                      color === c.class
                        ? "ring-2 ring-indigo-400"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Font Picker */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Font
              </p>
              <FontPicker value={font} onChange={setFont} />
            </div>

            {/* Save button */}
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded shadow"
              >
                Save
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
