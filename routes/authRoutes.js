// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.get("/register", authControllers.registerForm);
router.post("/register", authControllers.register);
router.get("/login", authControllers.loginForm);
router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);

module.exports = router;