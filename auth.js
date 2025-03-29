const express = require("express");
const { db, hashPassword, comparePassword } = require("./db");
const jwt = require("jsonwebtoken");
const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }

    try {
        const hashedPassword = await hashPassword(password);

        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Gagal mendaftar", error: err });
            }
            res.status(201).json({ message: "Registrasi berhasil" });
        });

    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Terjadi kesalahan", error: err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Email tidak ditemukan" });
            }

            const user = results[0];
            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Password salah" });
            }

            const token = jwt.sign({ id: user.id }, "RAHASIA_SUPER_AMAN", { expiresIn: "1h" });
            res.json({ message: "Login berhasil", token });
        });

    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
});

module.exports = router;

