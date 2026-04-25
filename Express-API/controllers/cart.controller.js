const cartModel = require("../models/cart.model");
const cartService = require("../services/cart.service");
const mongoose = require("mongoose");

// Add to Cart
module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { item } = req.body || {};

    if (!item || !mongoose.isValidObjectId(item.productId)) {
      return res.status(400).json({ message: "Valid productId is required" });
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const existingCart = await cartModel.findOne({ userId });

    if (existingCart) {
      const productExists = existingCart.items.some(
        (cartItem) => cartItem.productId.toString() === item.productId,
      );

      if (productExists) {
        throw new Error("Product already exist in cart");
      }
    }

    const cart = await cartService.addToCart({ userId, item });
    return res
      .status(200)
      .json({ message: "add item to cart successfully", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get Cart
module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartService.getCart(userId);
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    return res
      .status(200)
      .json({ message: "Cart retrieved successfully", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// remove single item from cart
module.exports.RemoveSingleProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    await cartService.RemoveSingleProduct(userId, productId);

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// remove all items from cart
module.exports.RemoveAllProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    await cartService.RemoveAllProducts(userId);
    return res
      .status(200)
      .json({ message: "All items removed from cart successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
