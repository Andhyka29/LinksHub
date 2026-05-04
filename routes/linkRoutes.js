const express = require("express");
const router = express.Router();
const linkControllers = require("../controllers/linkControllers");

router.get("/", linkControllers.getLinks);
router.post("/add", linkControllers.createLink);
router.get("/delete/:id", linkControllers.deleteLink);  
router.get("/favorite/:id", linkControllers.favoriteToggle);
router.get("/edit/:id", linkControllers.editForm);     
router.post("/edit/:id", linkControllers.updateLink);

module.exports = router;