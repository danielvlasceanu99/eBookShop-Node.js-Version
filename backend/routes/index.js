const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const bookRouter = require("./bookRoutes");
const authorRouter = require("./authorRouter");

router.use("/", resetRouter);
router.use("/", bookRouter);
router.use("/", authorRouter);

module.exports = router;
