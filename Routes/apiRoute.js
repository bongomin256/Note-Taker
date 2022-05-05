const apiRoute = require("express").Router();
const path = require("path");
const uuidv1 = require("uuid/v1");

// apiRoute GET method
apiRoute.get("/api/notes", (req, res) => {});

// apiRoute POST method
apiRoute.post("/api/notes", (req, res) => {});

apiRoute.delete("/api/notets/:uuidv1", (req, res) => {});
