const express = require("express");
const order = require("../controller/orderController");
const router = express.Router();

router.post("/create", order.createOrderController);

router.get("/today-list", order.getOrderList);

router.get("/get-new-order", order.getUserNewOrderList);

router.put("/order-process", order.orderProcesingUpdate);

router.put("/order-status", order.orderProcessStatus);

router.put("/order-deliverd", order.orderItemDeliverd);

router.put("/cancel-order", order.cancelOrderd);

router.get("/today-deliverd-item", order.itemDeliverdByToday);

router.get("/today-ordered-item", order.itemOrderedByToday);

router.get("/deliverd-item-list", order.allItemDeliverd);

router.get("/procesing-item-list", order.procesingOrderedList);

router.get("/pending-item-list", order.allPendingOrderedList);

router.get("/order-details", order.orderDetailsControllers);

router.get(
  "/order-status-mentain",
  order.allOrderWhichIsNotDeleverdAndNotCancel
);
module.exports = router;
