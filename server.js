// Importing the 'express' module
const express = require("express");

// Importing the 'path' module
const path = require("path");

// Importing the 'body-parser' module
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3004;

let items = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static files from the "public" directory
app.use(express.static(path.join(__dirname, "client/build")));

// API endpoint to get items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// API endpoint to add an item
app.post("/api/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// All other requests return the React app, so it can handle routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
