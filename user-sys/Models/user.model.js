const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user-sys");

let userSchema = mongoose.Schema(
  {
    username: String,
    fullname: String,
    email: String,
    phone: String,
    image: String,
    password: String,
    posts:[{type: mongoose.Schema.Types.ObjectId, ref: "post"}],
  },
  { timestamps: true },
);

module.exports = mongoose.model("user",userSchema)