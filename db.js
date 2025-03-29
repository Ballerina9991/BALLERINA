const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

// Konfigurasi koneksi ke database MariaDB
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Ganti jika ada user lain
    password: "Ballerina",   // Ganti dengan password database kamu
    database: "marketplace_db"
});

// Cek koneksi database
db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        return;
    }
    console.log("Connected to the database.");
});

// Fungsi untuk hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Fungsi untuk membandingkan password saat login
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { db, hashPassword, comparePassword };

