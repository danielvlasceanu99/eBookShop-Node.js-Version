const express = require("express");
const router = express.Router();
const linkController = require("../controllers").linkController;

router.post("/addLink", linkController.addLink);
router.get("/getAllLinks/:id", linkController.getAllLinks);
router.delete("/deleteLink/:id", linkController.deleteLink);

module.exports = router;
