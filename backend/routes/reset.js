const express = require("express");
const router = express.Router();

const resetController = require("../controllers").reset;

router.get("/reset", resetController.reset);
module.exports = router;
