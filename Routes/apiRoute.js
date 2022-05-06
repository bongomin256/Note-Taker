const apiRoute = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");
//const notesFile = require("./db/");

// apiRoute GET method
apiRoute.get("/api/notes/:note_id", (req, res) => {
  //logging that GET request for all the saved notes was received
  console.info(`${req.method} request received to get all the notes saved`);
  res.status(200).json("./db/db.json");

  //   fs.readFile("./db/db.json", "utf8", (err) => {
  //     err ? console.log(err) : res.status(200).json("./db/db.json");
  //   });
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

apiRoute.delete("/api/notets/:note_id", (req, res) => {
  //   const noteID = req.params.note_id;
  //   const deleteNote =
});

module.exports = apiRoute;
