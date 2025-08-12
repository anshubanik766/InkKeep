import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEllipsisV } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("inkkeep_notes")) || [];
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("inkkeep_theme") === "dark");

  useEffect(() => {
    localStorage.setItem("inkkeep_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("inkkeep_theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const openNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const saveNote = (noteData) => {
    if (noteData.id) {
      // update
      setNotes((prev) => prev.map((n) => (n.id === noteData.id ? { ...n, ...noteData, updatedAt: Date.now() } : n)));
    } else {
      // create
      const newNote = {
        ...noteData,
        id: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        pinned: noteData.pinned || false,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setIsModalOpen(false);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n))
    );
  };

  // Filtering + pinned-first sort
  const filtered = notes
    .filter((n) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (n.title || "").toLowerCase().includes(q) || (n.content || "").toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (a.pinned === b.pinned) return b.updatedAt - a.updatedAt;
      return a.pinned ? -1 : 1;
    });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <header className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">InkKeep</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Google Keep style notes — simple & fast</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-1 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm w-56 focus:outline-none"
            />
            <button className="absolute right-1 top-1.5 text-gray-400 hover:text-gray-600" aria-hidden>🔎</button>
          </div>

          <button
            onClick={() => setDarkMode((s) => !s)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle theme"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
          </button>

          <button
            onClick={openNewNote}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md shadow"
            title="New note"
          >
            <FaPlus /> New
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        {/* Notes grid */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">No notes found — create one!</div>
          ) : (
            filtered.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={() => deleteNote(note.id)}
                onEdit={() => openEditNote(note)}
                onTogglePin={() => togglePin(note.id)}
              />
            ))
          )}
        </section>
      </main>

      {/* Modal editor */}
      {isModalOpen && (
        <NoteModal
          initial={editingNote}
          onClose={() => setIsModalOpen(false)}
          onSave={saveNote}
        />
      )}
    </div>
  );
}
