const mysql = require('mysql2');

// Opprett tilkobling
const db = mysql.createPool({
    host: 'namox.idi.ntnu.no', // 
    port: 3306, // Standard MySQL-port
    user: 'username',
    password: '', // Passord for databasen
    database: 'robinssa',
    charset: 'utf8mb4', // Unicode-støtte
});



// Eksporter tilkobling
module.exports = db;
