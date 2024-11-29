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
const getTreningBruker = (req, res) => {
  const { utøverID } = req.params;
  const query = 'SELECT * FROM Treningsregistrering WHERE utøverID = ?';
  db.query(query, [utøverID], (err, results) => {
    if (err) {
      console.error('Feil ved henting av treninger for bruker:', err);
      res.status(500).send('Feil ved henting av treninger');
    } else {
      res.json(results);
    }
  });
};
const getTreningDato = (req, res) => {
  const { dato } = req.params;
  const query = 'SELECT * FROM Treningsregistrering WHERE dato = ?';
  db.query(query, [dato], (err, results) => {
    if (err) {
      console.error('Feil ved henting av treninger for dato:', err);
      res.status(500).send('Feil ved henting av treninger');
    } else {
      res.json(results);
    }
  });
};

module.exports = { getAllTrainings, addTraining, getTreningBruker, getTreningDato };
