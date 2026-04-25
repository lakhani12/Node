const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  totalbill: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});
module.exports = mongoose.model("order", orderSchema);
