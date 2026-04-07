const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require("./models/user.models")
const bcrypt = require("bcrypt")

// server memory temporary
// user ni req server pase jai tyare server ne, user kon chhe te khbar hoti nathi, mate darek req sathe user ne authorize
// ex. login req --> server ne khbar nathi hoti user kon chhe

// user req --> server (check image into folder)

// cookie parser ==> save token into browser storage

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("username", "test@user");
  res.send("Server Homepage");
});

// data --> convert jwt --> save cookie
app.get("/jwt", (req, res) => {
  let data = { username: "test", email: "test@gmail.com", role: "admin" };

  let token = jwt.sign(data, "aabbccdd");
  
  res.cookie("token",token);
  res.send("go to application and check your cookie storage")
});

// signup
app.get("/signup", async (req,res)=>{
    let createdUser = await userModel.create({
        username: "test_user",
        email: "test@user.com",
        password: "test123",
    });
    res.send(createdUser);
})

// for encrypt your password use --> bcrypt package
// use case: when your data leack your password is safe, if you encrypt your all user password.
// encrypt password stages:
// yoyr password + salt (deful rendom )

app.get("/hash",(req,res)=>{
    let password = "abc@123";
    // bcrypt.hash("password", "number",(error, hash)=>{})
    bcrypt.hash(password,10, (err,hash) => {
        console.log(hash);
        res.send(hash);
    });
});

app.listen(3000, () => {
  console.log("Server is Running!");
});
