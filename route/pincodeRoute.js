const express = require("express");
const { createPincodeController } = require("../controller/pincodeController");

const router = express.Router();

router.post("/create", createPincodeController);

module.exports = router;
