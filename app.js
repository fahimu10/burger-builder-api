const express = require("express");
const cors = require("cors");
const compression = require("compression");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

module.exports = app;
