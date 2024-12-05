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

  // Legg til ny bruker
const addUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Feil ved oppretting av bruker:', err);
      res.status(500).send('Feil ved oppretting av bruker');
    } else {
      res.send('Bruker opprettet');
    }
  });
};
module.exports = { getAllUsers, addUser };