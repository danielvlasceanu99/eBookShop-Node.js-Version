const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const bookRouter = require("./bookRoutes");

router.use("/", resetRouter);
router.use("/", bookRouter);

module.exports = router;
