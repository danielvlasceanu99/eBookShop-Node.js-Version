const express = require("express");
const router = express.Router();
const reviewController = require("../controllers").reviewController;

router.post("/addReview", reviewController.addReview);
router.get("/getAllReviews", reviewController.getAllReviews);
router.put("/updateReview/:id", reviewController.updateReview);
router.delete("/deleteReview/:id", reviewController.deleteReview);

module.exports = router;
