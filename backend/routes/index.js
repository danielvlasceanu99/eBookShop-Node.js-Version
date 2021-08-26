const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const bookRouter = require("./bookRoutes");
const authorRouter = require("./authorRouter");
const reviewRouter = require("./reviewRouter");
const userRouter = require("./userRouter");
const linkRoutes = require("./linkRoutes");

router.use("/", resetRouter);
router.use("/", bookRouter);
router.use("/", authorRouter);
router.use("/", reviewRouter);
router.use("/", userRouter);
router.use("/", linkRoutes);

module.exports = router;
