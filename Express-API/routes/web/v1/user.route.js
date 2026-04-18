const express = require("express");
const { body } = require("express-validator");
const userController = require("../../../controllers/user.controller");
const middleware = require("../../../middlewares/user.middleware");

const router = express.Router();

// register user
// secound validation -- use express validator package
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 4 })
      .withMessage("username must be 4 characters long"),
    body("email").isEmail().withMessage("enter valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 characters long"),
  ],
  userController.registerUser,
);

// login user
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage(
        "Enter Valid Email",
        body("password")
          .isLength({ min: 6 })
          .withMessage("Password Must be 6 chaecters long"),
      ),
  ],
  userController.loginUser,
);

// show profile
router.get("/profile", middleware.authUser, userController.profile);

// logout profile
router.get("/logout", middleware.authUser, userController.logout);

// update profile
router.put("/update", middleware.authUser, userController.updateUser);


module.exports = router;
