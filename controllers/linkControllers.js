const sql = require("../config/db");

exports.getLinks = async (req, res) => {
    const userId = req.session.user.id;
    const links = await sql`SELECT * FROM links WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.render("index", { links, user: req.session.user });
};

exports.createLink = async (req, res) => {
    const { title, url, category } = req.body;
    const userId = req.session.user.id;
    await sql`INSERT INTO links (user_id, title, url, category) VALUES (${userId}, ${title}, ${url}, ${category})`;
    res.redirect("/");
};

exports.deleteLink = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;
    await sql`DELETE FROM links WHERE id = ${id} AND user_id = ${userId}`;
    res.redirect("/");
};

exports.favoriteToggle = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;
    await sql`UPDATE links SET is_favorite = NOT is_favorite WHERE id = ${id} AND user_id = ${userId}`;
    res.redirect("/");
};

exports.editForm = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;
    const result = await sql`SELECT * FROM links WHERE id = ${id} AND user_id = ${userId}`;
    res.render("edit", { link: result[0] });
};

exports.updateLink = async (req, res) => {
    const { id } = req.params;
    const { title, url, category } = req.body;
    const userId = req.session.user.id;
    await sql`UPDATE links SET title = ${title}, url = ${url}, category = ${category} WHERE id = ${id} AND user_id = ${userId}`;
    res.redirect("/");
};