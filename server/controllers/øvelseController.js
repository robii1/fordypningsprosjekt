const db = require('../db');

// Hent alle øvelser
const getAllExercises = (req, res) => {
  const query = 'SELECT * FROM Øvelse';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Feil ved henting av øvelser:', err);
      res.status(500).send('Feil ved henting av øvelser');
    } else {
      res.json(results);
    }
  });
};

const getØvelseTrening = (req, res) => {
  const { treningsregistreringID } = req.params;
  const query = `
    SELECT e.*
    FROM TreningsregistreringØvelse tro
    JOIN Øvelse e ON tro.øvelseID = e.øvelseID
    WHERE tro.treningsregistreringID = ?`;
  db.query(query, [treningsregistreringID], (err, results) => {
    if (err) {
      console.error('Feil ved henting av øvelser for treningsregistrering:', err);
      res.status(500).send('Feil ved henting av øvelser');
    } else {
      res.json(results);
    }
  });
};


module.exports = { getAllExercises, getØvelseTrening };
