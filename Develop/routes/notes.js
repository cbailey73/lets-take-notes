const express = require('express');
const fs = require('fs');

const notesRouter = express.Router();

function getNotes() {
    const notes = fs.readFile('../db/db.json');
    return(JSON.parse(notes));
}

notesRouter.get('/api/notes', (req, res) => {
    res.send(getNotes());
})