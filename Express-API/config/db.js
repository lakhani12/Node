const mongoose = require("mongoose");
// const dbgr = require("debug")("development:server");
// const config = require("config");

function connerToDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Mongodb Conected");
    })
    .catch((err) => {
      console.log(err);
    });
}

// function connerToDB() {
//   mongoose
//     .connect(`${config.get("MongoDB_URL")}/ ecomerce`)
//     .then(() => {
//       dbgr("Mongodb Conected");
//     })
//     .catch((err) => {
//       dbgr(err);
//     });
// }

module.exports = connerToDB;
