// const note = require('express').Router();

// const uuid = require('uniqid');

// const {} = 


// // GET request for notes
// note.get('/api/notes', (req, res) => {
//     const notes = getNotes();
//     res.json(notes);
// });

// // POST request to add a note
// note.post('/api/notes', (req, res) => {
//     // Log that a POST request was received
//     console.info(`${req.method} request received to add a note`);
  
//     // Destructuring assignment for the items in req.body
//     const {noteTitle, noteContent} = req.body;
  
//     // If all the required properties are present
//     if (noteTitle && noteContent) {
//       // Create a new note object
//       const newNote = {
//         noteTitle,
//         noteContent,
//         id: uuid(),
//       };
  
//       // Get the existing notes
//       const notes = getNotes();
  
//       // Add the new note to the list
//       notes.push(newNote);
  
//       // Save the updated notes
//       saveNotes(notes);
  
//       const response = {
//         status: 'success',
//         body: newNote,
//       };
  
//       console.log(response);
//       res.status(201).json(response);
//     } else {
//       res.status(500).json('Error in adding note');
//     }
//   });


// // Helper function to read the existing notes from the file
// const getNotes = () => {
//     const notesData = fs.readFileSync('./db/db.json');
//     const notes = JSON.parse(notesData);
//     return notes;
//   };

// // Helper function to save the updated notes to the file
// const saveNotes = (notes) => {
//     const noteString = JSON.stringify(notes);
//     fs.writeFile('./db/db.json', noteString, (error) =>
//       error
//         ? console.error(error)
//         : console.log('Notes have been updated and saved')
//     );
//   };