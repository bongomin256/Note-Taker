const apiRoute = require("express").Router();
const uuidv1 = require("uuid/v1");
const fs = require("fs");

// apiRoute GET method
apiRoute.get("/api/notes", (req, res) => {});

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
      id: uuidv1(),
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
          `./db/db.json`,
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
