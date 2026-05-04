require("dotenv").config();
const sql = require("../config/db");
const bcrypt = require("bcrypt");

exports.registerForm = (req, res) => {
    res.render("register", { error: null });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (existing.length > 0) {
            return res.render("register", { error: "Email sudah digunakan" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.render("register", { error: "Terjadi kesalahan" });
    }
};

exports.loginForm = (req, res) => {
    res.render("login", { error: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (result.length === 0) {
            return res.render("login", { error: "Email tidak ditemukan" });
        }
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.render("login", { error: "Password salah" });

        req.session.user = { id: user.id, username: user.username };
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.render("login", { error: "Terjadi kesalahan" });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};