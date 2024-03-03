const express = require("express");
const {
  addToCart,
  removeToCart,
  getCartItem,
  updateSizeQuantity,
  getCartItemDetails,
} = require("../controller/cartController");

let router = express.Router();

router.post("/add-to-cart", addToCart);
router.post("/remove-to-cart", removeToCart);
router.get("/cart-item", getCartItem);

router.put("/update-size", updateSizeQuantity);

router.get("/get-cart-item-detail", getCartItemDetails);
module.exports = router;
