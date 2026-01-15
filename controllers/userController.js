const db = require("../db");
const bcrypt = require("bcrypt");

// CREATE USER
exports.createUser = (req, res) => {
    const { name, email, age, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });

        const sql = "INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, age, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "Email already in use" });
                }
                return res.status(500).json({ error: "Database error", details: err });
            }

            res.json({ message: "User created successfully", userId: result.insertId });
        });
    });
};

// GET ALL USERS
exports.getUsers = (req, res) => {
    const sql = "SELECT id, name, email, age FROM users"; // Don't send password
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// GET USER BY ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT id, name, email, age FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(results[0]);
    });
};

// UPDATE USER
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;

    if (!name && !email && !age) return res.status(400).json({ error: "At least one field must be provided" });

    let fields = [], values = [];
    if (name) { fields.push("name = ?"); values.push(name); }
    if (email) { fields.push("email = ?"); values.push(email); }
    if (age) { fields.push("age = ?"); values.push(age); }
    values.push(userId);

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Email already in use" });
            return res.status(500).json({ error: "Database error", details: err });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User updated successfully" });
    });
};

// DELETE USER
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    });
};

// DELETE ALL USERS (ADMIN ONLY)
exports.deleteAllUsers = (req, res) => {
    const sql = "DELETE FROM users";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        res.json({ message: "All users deleted successfully", deletedCount: result.affectedRows });
    });
};
