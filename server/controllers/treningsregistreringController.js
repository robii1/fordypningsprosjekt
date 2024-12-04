const db = require('../db');

// Hent alle treningsøkter
const getAllTrainings = (req, res) => {
  const query = 'SELECT * FROM Sessions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Feil ved henting av treningsøkter:', err);
      res.status(500).send('Feil ved henting av treningsøkter');
    } else {
      res.json(results)}
  });
};

// Legg til en ny treningsøkt
const addTraining = (req, res) => {
  const { utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar } = req.body;
  const query = `
    INSERT INTO Sessions (utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar], (err, results) => {
    if (err) {
      console.error('Feil ved lagring av treningsøkt:', err);
      res.status(500).send('Feil ved lagring av treningsøkt');
    } else {
      res.send('Treningsøkt lagt til')}
  });
};

// Hent treningsøkter basert på dato
const getTrainingsByDate = (req, res) => {
  const { dato } = req.params; // Dato sendes som en parameter i URL
  const query = 'SELECT * FROM Sessions WHERE dato = ?';
  db.query(query, [dato], (err, results) => {
    if (err) {
      console.error('Feil ved henting av treningsøkter for dato:', err);
      res.status(500).send('Feil ved henting av treningsøkter for dato');
    } else {
      res.json(results)}
  });
};

module.exports = { getAllTrainings, addTraining, getTrainingsByDate };