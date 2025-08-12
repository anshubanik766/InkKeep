import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteEditor from "../components/NoteEditor";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <NoteEditor addNote={addNote} />
        <div className="notes-list">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              onDelete={() => deleteNote(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
