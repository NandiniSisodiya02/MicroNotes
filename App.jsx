import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes on page load
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  // Add new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const savedNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, savedNote]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the note from local React state
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>MicroNotes</h1>
      
      <form onSubmit={handleAddNote} className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content..."
          rows={3}
        />
        <button type="submit">Add Note</button>
      </form>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className="note-card">
            <div className="note-header">
              <h3>{note.title}</h3>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteNote(note.id)}
              >
                🗑️ Delete
              </button>
            </div>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;