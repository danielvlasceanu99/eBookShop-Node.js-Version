const express = require("express");
const router = express.Router();
const authorController = require("../controllers").authorController;

router.post("/addAuthor", authorController.addAuthor);
router.get("/getAllAuthors", authorController.getAllAuthors);
router.get("/getAuthor/:id", authorController.getAuthor);
router.put("/updateAuthor/:id", authorController.updateAuthor);
router.delete("/deleteAuthor/:id", authorController.deleteAuthor);

module.exports = router;
