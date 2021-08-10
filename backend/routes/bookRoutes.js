const express = require("express");
const router = express.Router();

const bookController = require("../controllers").bookController;

router.post("/addBook", bookController.addBook);
router.get("/getAllBooks", bookController.getAllBooks);
router.get("/getBook/:id", bookController.getBook);
router.put("/updateBook/:id", bookController.updateBook);
router.delete("/deleteBook/:id", bookController.deleteBook);

module.exports = router;
