const db = require('../db');
const bcrypt = require('bcrypt');

// Hent alle brukere
const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Feil ved henting av users:', err);
        res.status(500).send('Feil ved henting av users');
      } else {res.json(results);
      }
    });
  };

  const addUser = (req, res) => {
    const { username, password } = req.body;

    // Generer hash av passord
    bcrypt.hash(password, 5, (err, hash) => {
      if (err) {
        console.error('Feil ved hashing av passord:', err);
      }

      const sql = 'INSERT INTO Users (username, password) VALUES (?, ?)';
      db.query(sql, [username, hash], (err, results) => {
        if (err) {
          console.error('Feil ved oppretting av bruker:', err);
        }
        res.send('Bruker opprettet');
      });
    });
  };

// Logg inn funksjon
const loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM Users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Feil ved henting av bruker:', err);
      res.status(500).send('Feil ved henting av bruker');
    } else if (results.length === 0) {
      res.status(404).send('Bruker ikke funnet');
    } else {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).send('Feil passord');
      } else {
        res.status(200).send('Innlogging vellykket');
      }
    }
  });
};
module.exports = { getAllUsers, addUser, loginUser};