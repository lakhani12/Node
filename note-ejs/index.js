// ejs --> light weight template engine
// ejs ==> you can write dynamic with help of ejs html

const express = require("express");
const app = express();
const fs = require("fs");



// if you want to read  frontend data then you have to must add below teo lines:
app.use(express.json()); // --> read data from body (read all json type data)
app.use(express.urlencoded({ extended: true })); // --> read from data only

// setup ejs
app.set("view engine", "ejs");
// if you want to use engine that create views folder

// ======= Task File Generater =========
app.get("/", (req, res) => {
  fs.readdir("./tasks", (err, files) => {
    if (err) throw err;
    res.render("index", { data: files });
  });
});

// method post --> data --> res.body
// method grt --> data --> res.params

// create file (post)
app.post("/create", (req, res) => {
  //   console.log(req);
  //   res.send(req.body);

  let data = `Title : ${req.body.title}\nDetails:${req.body.details}`;

  // create file
  fs.writeFile(
    `./tasks/${req.body.title.split(" ").join("-")}.txt`,
    data,
    (e) => {
      if (e) throw error;
    },
  );

  res.redirect("/");
});

// open file

app.get('/open/:filename', (req, res) =>{
    fs.readFile(`./tasks/${req.params.filename}`,(err, data) =>{
        if(err) throw err;
        res.render(
            "files", {data:data});
    })
})

// edit file
app.get('/edit/:filename', (req, res) =>{
    let oldname = req.params.filename;
    res.render("edit",{oldname})
});

app.post('/rename', (req, res) =>{
    fs.rename(`./tasks/${req.body.old}`, `./tasks/${req.body.new}`,(err) =>{
        if(err) throw err;
    });
    res.redirect("/");
});


app.listen(3000, () => {
  console.log("server is running");
});