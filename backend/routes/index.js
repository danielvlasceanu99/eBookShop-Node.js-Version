const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const bookRouter = require("./bookRoutes");
const authorRouter = require("./authorRouter");
const reviewRouter = require("./reviewRouter");

router.use("/", resetRouter);
router.use("/", bookRouter);
router.use("/", authorRouter);
router.use("/", reviewRouter);

module.exports = router;
