const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware");
const cartController = require("../../../controllers/cart.controller");

// add items
router.post("/add", userMiddleware.authUser, cartController.addToCart);

// get all items
router.get("/all", userMiddleware.authUser , cartController.getCart);

// remove single item from cart
router.delete("/:productId", userMiddleware.authUser, cartController.RemoveSingleProduct);

// remove all items from cart
router.delete("/clear", userMiddleware.authUser, cartController.RemoveAllProducts);

module.exports = router;