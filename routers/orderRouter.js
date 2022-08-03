const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();
const authorize = require("../middlewares/authorize");

const newOrder = async (req, res) => {
  const order = new Order(req.body);

  try {
    await order.save();
    res.status(200).send("order created");
  } catch {
    res.status(400).send("error creating order");
  }
};

const orderList = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.status(200).send(orders);
};

router.route("/").get(authorize, orderList).post(authorize, newOrder);

module.exports = router;
