// src/components/NoteModal.jsx
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
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
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return; // prevent empty
    const payload = {
      id: initial?.id,
      title,
      content,
      color,
      font,
      pinned,
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{initial ? "Edit note" : "New note"}</h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={pinned} onChange={() => setPinned((s) => !s)} />
              Pin
            </label>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><FaTimes /></button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:border-gray-700 bg-transparent"
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full mt-3 p-3 rounded border dark:border-gray-700 bg-transparent ${font}`}
              rows={8}
              placeholder="Write your note..."
            />
          </div>

          <aside className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.class)}
                    className={`w-8 h-8 rounded ${c.class} border ${color === c.class ? "ring-2 ring-indigo-400" : "border-gray-200"}`}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Font</p>
              <FontPicker value={font} onChange={setFont} />
            </div>

            <div className="mt-4">
              <button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded">
                Save
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
