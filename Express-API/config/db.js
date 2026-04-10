const mongoose = require("mongoose");
// const dbgr = require("debug");
// const config = require("config");
function connetToDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("📊Mongodb Connected");
    })
    .catch((err) => console.log(err));
}

// function connetToDB() {
//   mongoose
//     .connect(`${config.get("MongoDB_URl")}/ecommerce`)
//     .then(() => {
//     dbgr("Mongodb Connected");
//     })
//     .catch((err) => dbgr(err));
// }
module.exports = connetToDB;
