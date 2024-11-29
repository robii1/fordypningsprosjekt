const mysql = require('mysql2');
require('dotenv').config(); // Last inn miljøvariabler fra .env

// Opprett tilkobling
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4', // Unicode-støtte
});

// Eksporter tilkobling
module.exports = db;
