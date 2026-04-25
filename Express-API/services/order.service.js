const orderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const mongoose = require('mongoose');

module.exports.CreateOrder = async ({userId, items}) => {
    let totalAmount = 0;

    let orderItems = [];

    for (let item of items) {
        const productId = item.productId;

        if (!productId || !mongoose.isValidObjectId(productId)) {
            throw new Error("Valid productId is required");
        }

        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            throw new Error("Quantity must be a positive number");
        }

        const product = await productModel.findById(productId);
        if (!product) throw new Error("Product not found");
        const itemsTotal = product.price * item.quantity;

        totalAmount += itemsTotal;
        orderItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
            total: itemsTotal,
        });
    }
    return await orderModel.create({
        userId,
        items: orderItems,
        totalbill: totalAmount,
    });
};

// get order history or recent order
module.exports.GetOrders = async (userId) => {
    return await orderModel.findOne({ userId });
};
