const userModel = require("../models/user.models");

// when create a service -- when you want to change into daatbase

// third validation --> check all field are not blank

module.exports.createUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All Filed Are Required");
  }

  const user = await userModel.create({ username, email, password });

  return user;
};


// update data
module.exports.updateUser = async ({ userId, username, email }) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { username, email },
    { new: true },
  ).select("-password")

  if (!updatedUser) {
    throw new Error("user not found");
  }
  return updatedUser;
};
