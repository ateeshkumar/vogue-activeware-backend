const express = require("express");
const {
  addToCart,
  removeToCart,
  getCartItem,
  updateSizeQuantity,
} = require("../controller/cartController");

let router = express.Router();

router.post("/add-to-cart", addToCart);
router.post("/remove-to-cart", removeToCart);
router.get("/cart-item", getCartItem);

router.put("/update-size", updateSizeQuantity);
module.exports = router;
