const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/registerUser", userController.registerUser);
router.put("/changePassword/:id", userController.changePassword);
router.post("/login", userController.login);
router.post("/changeProfilePicture", userController.changeProfilePicture);

module.exports = router;
