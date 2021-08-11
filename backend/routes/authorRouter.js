const express = require("express");
const router = express.Router();
const authorController = require("../controllers").authorController;

router.post("/addAuthor", authorController.addAuthor);

module.exports = router;
