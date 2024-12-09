const db = require('../db');

// Hent alle treningsøkter

const getAllTrainings = (req, res) => {
  const sql = 'SELECT * FROM Sessions';
  db.query(sql, (err, results) => {
    if (err) { console.error('Feil ved henting av treningsøkter:', err);
      res.status(500).send('Feil ved henting av treningsøkter');
    } else { res.json(results)}
  });
};

// Legg til en ny treningsøkt
const addTraining = (req, res) => {
  const { utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar } = req.body;
  const sql = ` INSERT INTO Sessions (utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar], (err, results) => {
    if (err) {
      console.error('Feil ved lagring av treningsøkt:', err.message);
      res.status(500).send('Feil ved lagring av treningsøkt');
    } else { res.send('Treningsøkt lagt til')}
  });
};

// Hent treningsøkter basert på dato
const getTrainingsByDate = (req, res) => {
  const { dato } = req.params; 
  const sql = 'SELECT * FROM Sessions WHERE dato = ?';
  db.query(sql, [dato], (err, results) => {
    if (err) {
      console.error('Feil ved henting av treningsøkter for dato:', err);
      res.status(500).send('Feil ved henting av treningsøkter for dato');
    } else { res.json(results)}
  });
};

module.exports = { getAllTrainings, addTraining, getTrainingsByDate };