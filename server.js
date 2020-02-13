// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");


// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));

// Notes Data
var notes = []


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



// Posts
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  newNote.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    
  if (notes.length <= 5) {
      notes.push(newNote);
    }
    else {
      reservations.push(newReservation);
    }
    res.json(newReservation); 
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
