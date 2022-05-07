//Importing the express module
const express = require("express");
// Initializing the app,
const app = express();

const PORT = process.env.PORT || 3001;

//Importing the routes
const htmlRoute = require("./Routes/htmlRoute");
const apiRoute = require("./Routes/apiRoute");

//Creating the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//The route middleware
app.use("/api", apiRoute);
app.use("/", htmlRoute);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
