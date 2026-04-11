const express = require("express");
const { body } = require("express-validator");
const userController = require("../../../controllers/user.controller");
const middleware = require("../../../middlewares/user.middleware")

const router = express.Router();
// register user
// second valication -- use express validator package
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 4 })
      .withMessage("username must be 4 character long"),
    body("email").isEmail({ min: 4 }).withMessage("enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 charactor long"),
  ],
  userController.registerUser,
);

// login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 Character Long"),
  ],
  userController.loginUser,
);

router.get("/profile",middleware.authUser, userController.profile);

module.exports = router;
