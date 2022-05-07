const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const notes = require("./db/db.json");
const htmlRoute = require("./Routes/htmlRoute");
const apiRoute = require("./Routes/apiRoute");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", htmlRoute);
app.use("/api", apiRoute);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
