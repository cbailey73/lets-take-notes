const fs = require('fs');
const path = require('path');
const express = require('express');
const uuid = require('uniqid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
// GET notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

// GET request for existing notes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    const notes = getNotes();

    notes.push(newNote);

    saveNotes(notes);

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding note');
  }
});

// DELETE request to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const noteId = req.params.id;
  const notes = getNotes();
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    saveNotes(notes);

    const response = {
      status: 'success',
      message: 'Note deleted successfully',
    };

    console.log(response);
    res.status(200).json(response);
  } else {
    const response = {
      status: 'error',
      message: 'Note not found',
    };

    console.log(response);
    res.status(404).json(response);
  }
});

// Helper function to read the existing notes from the file
const getNotes = () => {
  const notesData = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(notesData);
  return notes;
};

// Helper function to save the updated notes to the file
const saveNotes = (notes) => {
  const noteString = JSON.stringify(notes);
  fs.writeFile('./db/db.json', noteString, (error) =>
    error
      ? console.error(error)
      : console.log('Notes have been updated and saved')
  );
};

// LISTEN request to start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
