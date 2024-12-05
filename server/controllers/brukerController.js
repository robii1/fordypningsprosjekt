const db = require('../db');

// Hent alle brukere
const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Feil ved henting av users:', err);
        res.status(500).send('Feil ved henting av users');
      } else {
        res.json(results);
      }
    });
  };
module.exports = { getAllUsers };