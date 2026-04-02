// create a express server

//package.json ==> type ==> module ==> import
// package.json ==> type ==> commonjs ==> const,require

const express = require("express");
const path = require("path");

const app = express();

// Middleware ==> Middeware is run before route, call before function,
// usecase: authentication, authorization, logging, error handling Validation, etc
// user req ----> server
// server res --> user
// with midddleware :
// user req ----> middleware ----> server
app.use(function(req, res, next) {
  console.log("Middleware is working 🔧🔧🔧");
  next(); // call next middleware or route handler
});


// create a route for home page
app.get("/", (req, res) => {
  res.send("Hello World welcome to jungale of node js 😘✔🕉♋(●)◡(●)");
});

app.get("/profile", function(req, res) {
  res.send(" Show Profile page 🧛‍♂️🧛‍♀️");
});

app.get("/login", function(req, res) {
const dirpath = path.resolve();
const FilePath = path.join(dirpath, "pages", "login.html");
  res.sendFile(FilePath);
});

// app handle 404 error :
// last listed route .
// always all error that are not handelded by the provided routes will be handled by this route

app.use(function(req, res) {
    res.status(404).send("404 Not Found 😢😢😢");
    res.status(500).send("500 Internal Server Error 😢😢😢");
});

app.get("/register", function(req, res) {
  res.send(" Show Register page 📝");
});

app.listen(6969, () => {
    console.log("Server is running on port 6969 ");
});
