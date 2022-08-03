const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  ingredients: [{ type: { type: String }, amount: Number }],
  customer: {
    deliveryAddress: String,
    phoneNumber: String,
  },
  price: Number,
  orderTime: { type: Date, default: Date.now },
});

module.exports.Order = model("Order", orderSchema);
