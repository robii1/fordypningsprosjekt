const db = require('../db');

// Hent alle treningsøkter
// Denne må oppdateres slik at den henter ut også basert på ID
// fikk feilmeldinger men kommenterer litt uansett
const getAllTrainings = (req, res) => {
  // const {userID} = req.params for å få id'en til innlogget
  // sql = 'SELECT * FROM Sessions WHERE utøverID = ?'
  const sql = 'SELECT * FROM Sessions';
  db.query(sql, (err, results) => {
    if (err) { console.error('Feil ved henting av treningsøkter:', err);
      res.status(500).send('Feil ved henting av treningsøkter'); //intern
    } else { res.json(results)}
  });
};

// Legg til en ny treningsøkt
const addTraining = (req, res) => {
  const { utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar } = req.body;
  db.query(` INSERT INTO Sessions (utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [utøverID, dato, øvelsestype, vekt, repetisjoner, serier, tretthet, kommentar], (err, results) => {
    if (err) {
      console.error('Feil ved lagring av treningsøkt:', err.message);
      res.status(500).send('Feil ved lagring av treningsøkt'); //intern serverfeil
    } else { res.send('Treningsøkt lagt til')}
  });
};

// Hent treningsøkter basert på dato
// Må også hente ut basert på ID
const getTrainingsByDate = (req, res) => {
  //her må man gjøre som over også og få med id på tilnærmet lik måte
  const { dato } = req.params; 
  db.query('SELECT * FROM Sessions WHERE dato = ?', [dato], (err, results) => {
    if (err) {
      console.error('Feil ved henting av treningsøkter for dato:', err);
      res.status(500).send('Feil ved henting av treningsøkter for dato'); //intern server feil
    } else { res.json(results)}
  });
};

module.exports = { getAllTrainings, addTraining, getTrainingsByDate };