const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./Models/user.model");
const postModel = require("./Models/post.model");
const path = require("path");
const upload = require("./config/multer");
const morgan =require("morgan");

// image folder --> image --> aa.jpg(laptop)
// my pic folder --> image --> aa.jpg(mobile)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// frontend logis
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/profile", auth, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user });
});

app.get("/post", auth, (req, res) => {
  res.render("post");
});

app.get("/editprofile", auth, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  res.render("editprofile", { user });
});

// delete post

app.get("/delete/:id", auth, async (req,res)=>{
  let user = await userModel.findOne({email:req.user.email});

  await postModel.findOneAndDelete({_id: req.params.id})

  let postNumber = user.posts.indexOf(req.params.id);

  user.post.splice(postNumber,1);
  await user.save();

  res.redirect("/profile");
})
// backend logic + database logic
// signup user ==> createa new user
app.post("/create", (req, res) => {
  let { fullname, username, email, phone, password, image } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      await userModel.create({
        fullname,
        username,
        email,
        phone,
        password: hash,
        image,
      });
    } catch (err) {
      res.send(err);
    }
  });
  res.redirect("/");
});

// logine user ==. check emial and password, redirect to profile page

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.send("Somting Went Worng - Email");
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email: user.email }, "aabbcc");

        res.cookie("token", token);
        res.redirect("/profile");
      } else {
        res.send("Somiting Went Wrong");
      }
    });
  }
});

// logout user ==> remove token from cookie
app.get("/logout", (req, res) => {
  res.cookie = "";
  res.redirect("/");
});

// create post
app.post("/post", auth, upload.single("imgurl"), async (req, res) => {
  console.log(req.user);
  let user = await userModel.findOne({ email: req.user.email });
  let { title, description } = req.body;

  console.log(req.file);
  let createdPost = await postModel.create({
    userId: user._id,
    title,
    description,
    imgurl: req.file.filename,
  });

  // add (push) posts into user data
  user.posts.push(createdPost);
  await user.save();

  res.redirect("/profile");
});

// edit post
app.post("/edit", auth, async (req, res) => {
  let { fullname, username, email, phone, image } = req.body;

  await userModel.findOneAndUpdate(
    { email: req.user.email },
    {
      fullname,
      username,
      email,
      phone,
      image,
    },
    { new: true },
  );
  res.redirect("/profile")
});
// middleware Functions
function auth(req, res, next) {
  console.log(req.cookies.token);

  let token = req.cookies.token;
  if (!token) {
    res.send("Access Denied !!");
  }

  try {
    let verified = jwt.verify(token, "aabbcc");
    req.user = verified; // thas datasent into route(check profile route, you can access email like req.user.emial)
    console.log(verified);
    next();
  } catch (err) {
    console.log("Invailed Token ");
  }
}

app.listen(3000, () => {
  console.log("server running");
});
