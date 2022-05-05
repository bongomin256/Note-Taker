const apiRoute = require("express").Router();
const uuidv1 = require("uuid/v1");
const fs = require("fs");
const notesFile = require("./db/db.json");

// apiRoute GET method
apiRoute.get("/api/notes", (req, res) => {
  //logging that GET request for all the saved notes was received
  console.info(`${req.method} request received to get all the notes saved`);
  res.status(200).json(notesFile);
});

// apiRoute POST method
apiRoute.post("/api/notes", (req, res) => {
  //loging that POST request was received
  console.info(`${req.method} request received to save the new note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    // new note object variable we will save
    const newNote = {
      title,
      text,
      note_id: uuidv1(),
    };
    // converting the data to string so we can save it
    // const noteNoteString = JSON.stringify(newNote)
    fs.readFile(notesFile, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNewNote = JSON.parse(data);
        parsedNewNote.push(newNote);

        fs.writeFile(
          notesFile,
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

apiRoute.delete("/api/notets/:uuidv1", (req, res) => {});

module.exports = apiRoute;
