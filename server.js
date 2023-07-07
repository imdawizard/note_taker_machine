const express = require("express");
const path = require('path');
const app = express();
const fs = require('fs');

//serve static files from the public directory
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//creates route for GET/notes that returns notes.html
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/api/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`)
    console.info(`${req.method} request received to get reviews`);
});

//all other routes
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error in reading the database');
                return;
            }

            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    res.status(500).json('Title and text are required');
                    return;
                }

                const response = {
                    status: 'success',
                    body: newNote,
                };

                console.log(response);
                res.status(201).json(response);
            });
        });
    } else {
        res.status(400).json({ error: 'Error in the posting of this message' });
    }
});














//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Failed to read notes from the database'});
//         }

//         let notes = JSON.parse(data);

//         notes.push(newNote);

//         fs.writeFile('db.json', JSON.stringify(notes), (err) =>{
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Failed to serve note to the database'});
//             }

//             res.status(200).json({ message: "note saved successssfully"});
//         });
//     });
// });

// app.get('/api/notes', (req, res) => {
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Failed to read notes from database :('})
//         }
//         const notes = JSON.parse(data);
//     res.status(200).json(notes);
//     });
// });
//listens on port 3001 and logs confirmation
const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} 🚀`)
});




// app.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);
//     const { title, text}= req.body;

//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//         };

//         // const reviewString = JSON.stringify(newNote);
//         fs.readFile('./db/db.json', 'utf8',(err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedNotes = JSON.parse(data);

//                 parsedNotes.push(newNote);
//             }
//         })

//         fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 2), 
//         (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated reviews!')
//         );
             
//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         console.log(response);
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('error in posting note');
//     };
// });
