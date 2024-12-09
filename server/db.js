const dotenv = require('dotenv'); //importere dotenv
const mysql = require('mysql2');

// miljøvariabler
dotenv.config();


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

//sjekket at det fungerer å lese
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
