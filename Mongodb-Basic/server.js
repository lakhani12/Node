const express = require("express");
const app = express();



app.use(express.json()); // --> read data from body (read all json type data)
app.use(express.urlencoded({ extended: true })); // --> read from data only

// setup ejs
app.set("view engine", "ejs");
// if you want to use engine that create views folder

app.get("/", (req, res) => {
    res.send("Server Home page");
});
app.listen(3000, () => {
    console.log("server is running");
});

