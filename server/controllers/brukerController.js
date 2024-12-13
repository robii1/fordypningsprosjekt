const db = require('../db');
const bcrypt = require('bcrypt');

// Hent alle brukere
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        console.error('Feil ved henting av users:', err);
        //intern serverfeil
        res.status(500).send('Feil ved henting av users'); //intern serverfeil
      } else {res.json(results);
      }
    });
  };

  const addUser = (req, res) => {
    const { username, password } = req.body;

    // lager hash av passord
    bcrypt.hash(password, 5, (err, hash) => {
      if (err) {
        console.error('Feil ved hashing av passord:', err);
      }
          //legg inn sql - hashet passord
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
  
  db.query('SELECT * FROM Users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Feil ved henting av bruker:', err);
      
      res.status(500).send('Feil ved henting av bruker') //intern serverfeil
    } else if (results.length === 0) { //sjekk om brukeren finnes
      res.status(404).send('Bruker ikke funnet'); //ikke funnet
    } else {
      //sjekk at passordet matcher med bcrpyt
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {//ingen match
        res.status(401).send('Feil passord'); //ikke auitorisert
      } else {
        res.status(200).send('Innlogging vellykket'); //alt ok
      }
    }
  });
};
module.exports = { getAllUsers, addUser, loginUser};