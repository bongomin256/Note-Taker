//Creating the router
const apiRoute = require("express").Router();

// Importing the unique identifer module and file syetem
const uuid = require("uuid");
const fs = require("fs");

// apiRoute GET method
apiRoute.get("/notes", (req, res) => {
  //logging that GET request for all the saved notes was received
  console.info(`${req.method} request received to get all the saved notes`);

  // Reading the database
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      //sending back response
      res.status(200).json(JSON.parse(data));
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
      id: uuid.v4(),
    };

    // reading the file in the db
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // Making the new data a JSON and storing in a variable call pasredNewNote
        const parsedNewNote = JSON.parse(data);
        // Pushing it the array
        parsedNewNote.push(newNote);

        //writing the new data in out db
        fs.writeFile(
          "./db/db.json",

          //converting the data into a JSON string
          JSON.stringify(parsedNewNote, null, 3),
          (err) => {
            err
              ? console.log(err)
              : console.log(`Successfully saved the new note`);
          }
        );
      }
    });
    //response to be send back with the status
    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    //sending back the response
    res.status(201).json(response);
  } else {
    res.status(400).json("Error in saving the note");
  }
});

//api DELETE Method
apiRoute.delete("/notes/:id", (req, res) => {
  //storing the
  const noteID = req.params.id;

  // Rreading the db data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //storing the data
      let notes = JSON.parse(data);
      // Finding the notes to be deleted using the id param included
      notesIndex = notes.findIndex((note) => note.id === noteID);

      if (notesIndex >= 0) {
        notes.splice(notesIndex, 1);
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 3), (err) => {
          err
            ? console.log(err)
            : console.log(`Successfully deleted the new note`);
        });
      }
    }
  });

  const response = {
    status: "deleted",
  };
  //sending back the response
  res.status(200).json(response);
});

module.exports = apiRoute;
