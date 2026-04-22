const mongoose = require("mongoose");

let managerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    rights: [
      {
        name: { type: String, minlength: 3 },
        isActive: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("manager", managerSchema);
