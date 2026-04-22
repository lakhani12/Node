// show all user logic

const userModel = require("../models/user.model");

// get all user
module.exports.getAllUser = async () => {
  const allUser = await userModel.find();

  return allUser;
};

// delete user
module.exports.deleteUser = async (id) => {
  const user = await userModel.findOneAndDelete({ _id: id });
  return user;
};

// update role
module.exports.userRoleUpdate = async ({userId, role}) => {
  return await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { role: role } },
    { new: true },
  );
};
