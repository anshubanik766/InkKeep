import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { FaThumbtack } from "react-icons/fa";

export default function NoteCard({ note, onDelete, onEdit, onTogglePin }) {
  const bg = note.color || (note.pinned ? "bg-yellow-100" : "bg-white");
  const font = note.font || "font-sans";

  return (
    <article
      className={`rounded-lg p-4 shadow-sm border ${bg} ${font} transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md dark:border-gray-700`}
      style={{ wordBreak: "break-word" }}
    >
      <div className="flex justify-between items-start">
        {/* Note text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {note.title || "Untitled"}
          </h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {note.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 ml-3 shrink-0">
          {/* Pin */}
          <button
            onClick={onTogglePin}
            title={note.pinned ? "Unpin note" : "Pin note"}
            className={`p-2 rounded-full transition-colors ${
              note.pinned
                ? "text-yellow-600 hover:text-yellow-700"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            <FaThumbtack />
          </button>

          {/* Edit */}
          <button
            onClick={onEdit}
            title="Edit note"
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <FiEdit />
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            title="Delete note"
            className="p-2 rounded-full text-red-500 hover:text-red-700 transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
}
