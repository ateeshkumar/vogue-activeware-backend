const express = require("express");
const order = require("../controller/orderController");
const router = express.Router();

router.post("/create", order.createOrderController);

router.get("/today-list", order.getOrderList);
module.exports = router;
