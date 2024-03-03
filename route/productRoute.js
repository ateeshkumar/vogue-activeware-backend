const express = require("express");
const {
  createProductController,
  getAllProduct,
  getSingleProduct,
  getProductCategoryList,
  deleteProductController,
  updateProductController,
  searchProductController,
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

router.get("/product/category", getProductCategoryList);

router.delete("/delete-product", deleteProductController);

router.put("/update-product", updateProductController);

router.get("/search-product", searchProductController);
module.exports = router;
