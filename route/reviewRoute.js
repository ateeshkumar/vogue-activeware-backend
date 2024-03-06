const express = require("express");
const review = require("../controller/reviewController");
const { reviewRoute } = require("../middleware/ImageMiddleWare");
const router = express.Router();

router.post("/create", reviewRoute.single("productImg"), review.createReview);

module.exports = router;
