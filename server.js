const express = require("express");
const app = express();
const notes = [];

//serve static files from the public directory
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//creates route for GET/notes that returns notes.html
app.get('/api/notes', (req, res) => {{
    res.sendFile(__dirname + '/public/notes.html');
}});

//all other routes
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;


    //pushes new note to notes array
    notes.push(newNote);
    //confirms note was saved successsully
    res.status(200).json({ message: "Note saved successfully"});
})

app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
});

//listens on port 3001 and logs confirmation
const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} 🚀`)
})