const express = require("express");
const coupon = require("../controller/couponController");
const router = express.Router();
router.post("/create", coupon.couponCodeGenerator);

router.get("/apply", coupon.applyCouponCode);
module.exports = router;
