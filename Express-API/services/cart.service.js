const cartModel = require("../models/cart.model");

// add item to cart
module.exports.addToCart = async ({ userId, item }) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    return await cartModel.create({ userId, items: [item] });
  }

  cart.items.push(item);
  return await cart.save();
};

// get cart
module.exports.getCart = async (userId) => {
  return await cartModel.findOne({ userId });
};

// remove item from cart
module.exports.RemoveSingleProduct = async (userId, productId) => {
  // find login user cart
  let cart = await cartModel.findOne({ userId });
  if (!cart) throw new Error("cart not found");

  // find index number of product based on productId
  const itemIndex = cart.items.findIndex(
    (i) => i.productId.toString() === productId,
    // i --> that give items array
  );

  console.log(itemIndex);

  if (itemIndex < 0) {
    throw new Error("Item not Found");
  }

  cart.items.splice(itemIndex, 1);
  return await cart.save();
};

// remove all items from cart
module.exports.RemoveAllProducts = async (userId) => {
  // find login user cart
  let cart = await cartModel.findOne({ userId });
  if (!cart) throw new Error("cart not found");
  cart.items = [];
  return await cart.save();
};
