const express = require("express");
const app = express();

//serve static files from the public directory
app.use(express.static('public'));

//creates route for GET/notes that returns notes.html
app.get('/notes', (req, res) => {{
    res.sendFile(__dirname + '/public/notes.html');
}});

//all other routes
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

//listens on port 3001 and logs confirmation
const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} 🚀`)
})