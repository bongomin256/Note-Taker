// Importing all the modules required
const htmlRouter = require("express").Router();
const path = require("path");

htmlRouter.use(express.static("public"));

// HTML route that will send back notes.html file
htmlRouter.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Fallback route for when a user attempts to visit routes that don't exist
htmlRouter.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
