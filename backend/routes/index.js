const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");

router.use("/", resetRouter);

module.exports = router;
