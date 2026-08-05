const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory array storage
let notes = [];
let nextId = 1;

// TODO 1: GET /api/notes — send back the notes array
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// TODO 2: POST /api/notes — build a note from req.body, add it to the array, send it back
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: nextId++,
    title: title || "Untitled",
    content: content || "",
    createdAt: new Date(),
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE /api/notes/:id — remove a note by id
app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.status(200).json({ message: "Note deleted successfully", id: noteId });
});

app.listen(5000, () => console.log("Server running on port 5000"));