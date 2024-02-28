const express = require("express");
const {
  addToWishlist,
  removeToWishlist,
  getWishlistItem,
} = require("../controller/wishlistController");

const router = express.Router();

router.post("/add-to-wishlist", addToWishlist);
router.post("/remove-to-wishlist", removeToWishlist);
router.get("/wishlist-item", getWishlistItem);
module.exports = router;
