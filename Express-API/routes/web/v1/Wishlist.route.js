const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware");
const wishlistController = require("../../../controllers/Wishlist.controller");

// add into Wishlist
router.post(
  "/add",
  userMiddleware.authUser,
  wishlistController.AddToWishlist,
);

// remove from Wishlist

module.exports = router;
