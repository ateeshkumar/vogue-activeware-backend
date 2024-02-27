const express = require("express");
const {
  userRegisterController,
  loginControler,
  findAllUser,
  findSingleUser,
} = require("../controller/UserConroller");
const router = express.Router();

router.post("/signup", userRegisterController);
router.post("/login", loginControler);
router.get("/list", findAllUser);
router.get("/user", findSingleUser);
module.exports = router;
