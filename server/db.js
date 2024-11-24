const mysql = require('mysql2');

// Opprett tilkobling
const db = mysql.createPool({
    host: 'namox.idi.ntnu.no', // Bruker TCP/IP
    port: 3306, // Standard MySQL-port
    user: 'robinssa',
    password: 'DuVPRvTZ', // Passord for databasen
    database: 'robinssa',
    charset: 'utf8mb4', // Unicode-støtte
});



// Eksporter tilkobling
module.exports = db;
