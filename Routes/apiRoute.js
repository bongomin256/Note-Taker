const apiRoute = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");
//const notesFile = require("./db/");

// apiRoute GET method
apiRoute.get("/notes", (req, res) => {
  //logging that GET request for all the saved notes was received
  console.info(`${req.method} request received to get all the notes saved`);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
});

// apiRoute POST method
apiRoute.post("/notes", (req, res) => {
  //loging that POST request was received
  console.info(`${req.method} request received to save the new note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    // new note object variable we will save
    const newNote = {
      title,
      text,
      note_id: uuid.v4(),
    };
    // converting the data to string so we can save it
    // const noteNoteString = JSON.stringify(newNote)
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNewNote = JSON.parse(data);
        parsedNewNote.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNewNote, null, 3),
          (err) => {
            err
              ? console.log(err)
              : console.log(`Successfully saved the new note`);
          }
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(400).json("Error in saving the note");
  }
});

apiRoute.delete("/notes/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  const notes = JSON.parse(data);

  const deleteNote = notes.find((note) => note.note_id === noteID);
  //   const deleteNote =

  if (deleteNote) {
    notes = notes.filter((note) => note.note_id !== noteID);
    res.status(200).json(deleteNote);
  } else {
    res
      .status(404)
      .json({ message: "the note you are trying to deleted doesnt exist" });
  }

  //   fs.readFile("./db/db.json", "utf8", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       let notes = JSON.parse(data);
  //       notes = notes.filter((note) => note.note_id !== noteID);

  //     }
  //   });

  //   const response = {
  //     status: "deleted",
  //     body: notes,
  //   };
  //   res.status(200).json(response);
});

module.exports = apiRoute;
