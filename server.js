// Dependencies
var express = require("express");
var path = require("path");
const textToID = require("texttoid");


// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

var notes = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));




// Routes 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});


//Displays all notes as JSON
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

app.get("/api/notes/:id", function(req, res) {
  var chosen = parseInt(req.params.id);

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    console.log(notes[i].id)
    if (chosen === notes[i].id) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});



// Posts
app.post("/api/notes", function(req, res) {
  
  var newNote = req.body;

  newNote.id = textToID(newNote.title); //newNote.title.replace(/\s+/g, "").toLowerCase();
  
  notes.push(newNote);

  res.json(newNote); 

});

app.delete("/api/notes/:id", function(req, res) {
  var chosen = parseInt(req.params.id);

  //splice()
  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].id) {
      notes[i] = {};
      return res.json(true)
    }
  }
    return res.json(false);
});


// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
