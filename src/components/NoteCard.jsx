// src/components/NoteCard.jsx
import React from "react";
import { FiTrash2, FiEdit, FiThumbtack } from "react-icons/fi";

export default function NoteCard({ note, onDelete, onEdit, onTogglePin }) {
  const bg = note.color || (note.pinned ? "bg-yellow-100" : "bg-white");
  const font = note.font || "font-sans";

  return (
    <article
      className={`rounded-lg p-4 shadow-sm border ${bg} ${font} transform transition hover:scale-[1.01]`}
      style={{ wordBreak: "break-word" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{note.title || "Untitled"}</h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{note.content}</p>
        </div>

        <div className="flex flex-col items-end gap-2 ml-3">
          <button onClick={onTogglePin} title="Pin/unpin" className={`p-1 rounded ${note.pinned ? "text-yellow-600" : "text-gray-400"}`}>
            <FiThumbtack />
          </button>
          <button onClick={onEdit} title="Edit" className="p-1 rounded text-gray-500 hover:text-gray-700">
            <FiEdit />
          </button>
          <button onClick={onDelete} title="Delete" className="p-1 rounded text-red-500 hover:text-red-700">
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
}
