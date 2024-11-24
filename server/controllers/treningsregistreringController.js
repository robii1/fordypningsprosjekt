const db = require('../db');

// Hent alle treninger
const getAllTrainings = (req, res) => {
  const query = 'SELECT * FROM Treningsregistrering';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Feil ved henting av treninger:', err);
      res.status(500).send('Feil ved henting av treninger');
    } else {
      res.json(results);
    }
  });
};

// Legg til en ny trening
const addTraining = (req, res) => {
  const { utøverID, dato, varighet, øvelsestype, tretthet, kommentar } = req.body;
  const query = 'INSERT INTO Treningsregistrering (utøverID, dato, varighet, øvelsestype, tretthet, kommentar) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [utøverID, dato, varighet, øvelsestype, tretthet, kommentar], (err, results) => {
    if (err) {
      console.error('Feil ved lagring av trening:', err);
      res.status(500).send('Feil ved lagring av trening');
    } else {
      res.send('Trening lagt til');
    }
  });
};

module.exports = { getAllTrainings, addTraining };
