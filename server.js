const express = require("express");
const app = express();
const fs = require('fs');

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

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes from the database'});
        }

        let notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile('db.json', JSON.stringify(notes), (err) =>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to serve note to the database'});
            }

            res.status(200).json({ message: "not saved successssfully"});
        });
    });
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes from database :('})
        }
        const notes = JSON.parse(data);
    res.status(200).json(notes);
    });
});
//listens on port 3001 and logs confirmation
const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} 🚀`)
});