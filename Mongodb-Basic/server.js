const express = require("express");
const app = express();
const userModel = require("./model/user.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("server home page");
});

//CRUD operations

//create
app.get("/create", async (req, res) => {
    let createUser = await userModel.create({
        username: "d",
        name: "Doe",
        email: "test1@gmail.com",
    });
    res.send(createUser);
});
 
//read

app.get("/all", async (req, res) => {
    //all users
    let allUsers = await userModel.find();
    res.send(allUsers);
});

//specific user - first only
app.get("/read", async (req, res) => {
    let user = await userModel.findOne({ username: "d" });
    res.send(user);
});

//all user based on query
app.get("/user", async (req, res) => {
    let userData = await userModel.find({ username: "john_doe" });
    res.send(userData);
}); 

//update
app.get("/update", async (req, res) => {
   let updatedUser = await userModel.findOneAndUpdate(
        { username: "d" },//FIND QUERY --> what is find
        { username: "Coder" , email: "coder@gmail.com" },//UPDATE QUERY --> what is update
        { new: true },//OPTIONS --> what is options

   );
    res.send(updatedUser);
});


//delete
app.get("/delete", async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({ username: "Coder" });
    res.send(deletedUser);
});
    



app.listen(3000, () => {
    console.log("server is running on port 3000");
}); 


