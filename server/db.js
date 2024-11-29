const dotenv = require('dotenv'); //importere dotenv
const mysql = require('mysql2');

// miljøvariabler
dotenv.config();

const result = dotenv.config();

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

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log(result.parsed); // Viser innholdet i .env