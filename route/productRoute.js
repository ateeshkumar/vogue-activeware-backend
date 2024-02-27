const express = require("express");
const {
  createProductController,
  getAllProduct,
  getSingleProduct,
} = require("../controller/productController");
const { productRoute } = require("../middleware/ImageMiddleWare");

const router = express.Router();

router.post(
  "/create",
  productRoute.array("productImg", 12),
  createProductController
);

router.get("/list", getAllProduct);

router.get("/product", getSingleProduct);

module.exports = router;
