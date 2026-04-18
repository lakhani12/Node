const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.models");

module.exports.registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { username, email, password } = req.body;

  //check user is alredy registed or not
  let isExist = await userModel.findOne({ email: email });
  if (isExist) {
    return res.status(400).json({ message: "user is already register" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });

  let token = await user.generateAutToken();

  res.status(200).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  let checkUser = await userModel.findOne({ email: email }).select("+password");

  if (!checkUser) {
    return res.status(401).json({ message: "User Not Found" });
  }
  const isMatch = await checkUser.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Worng Password" });
  }

  const token = checkUser.generateAutToken();
  res.cookie("token", token);

  res.status(200).json({ token, checkUser });
};

module.exports.profile = (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "User logout Successfully" });
};

module.exports.updateUser = async (req, rse) => {
  const userId = req.user.id;
  console.log(userId);

  const { username, email } = req.body;

  const updateUser = await userService.updateUser({ userId, username, email });

  rse.status(200).json({ message: "user Updated Successfully", updateUser });
};
