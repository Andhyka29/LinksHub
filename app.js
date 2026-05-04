require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const linkRoutes = require("./routes/linkRoutes");
const authRoutes = require("./routes/authRoutes");
const { isAuthenticated } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 hari
}));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", authRoutes);
app.use("/", isAuthenticated, linkRoutes); // ← proteksi semua link routes

app.listen(process.env.PORT || 3006, () => {
    console.log("Server is running on port 3006");
});