const orderService = require('../services/order.service');

module.exports.CreateOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items } = req.body || {};

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items array is required" });
        }

        const order = await orderService.CreateOrder({userId, items});

        if (!order) {
            return res.status(400).json({message: "Order creation failed"});
        }
        return res.status(201).json({message: "Order created successfully", order});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

// get order details - show history or recent order
module.exports.GetOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderService.GetOrders(userId);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json({ message: "Orders retrieved successfully", orders });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};