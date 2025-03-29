const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./auth");

dotenv.config();
const app = express();

const mysql = require("mysql2");

// Buat koneksi ke database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ballerina",  // Sesuaikan jika ada password
    database: "marketplace_db"
});

// Cek koneksi
db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Database connected successfully!");
    }
});

app.use(cors());
app.use(express.json());

// Izinkan akses ke folder marketplace-frontend
app.use("/marketplace-frontend", express.static(path.join(__dirname, "../marketplace-frontend")));

// Izinkan akses ke folder public
app.use("/public", express.static(path.join(__dirname, "public")));

// API Authentication (Register & Login)
app.use("/auth", authRoutes);

// Dummy data produk
const products = [
    { id: 1, name: "Produk A", price: 100000, image: "/public/assets/IMG_20250322_130742.jpg" },
    { id: 2, name: "Produk B", price: 150000, image: "/public/assets/IMG_20250322_130852.jpg" }
];

// API untuk mendapatkan daftar produk
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

