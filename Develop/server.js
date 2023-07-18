const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(require(path.join(__dirname, '/routes.notes.js') ))

// const notesRoute = require('./routes/notes');
// app.use('/notes', notesRoute);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).catch((error) => {
    console.error(error)
});