const db = require('../db');

// Hent alle øvelser
const getAllExercises = (req, res) => {
  db.query('SELECT * FROM Exercises', (err, results) => {
    if (err) { console.error('Feil ved henting av øvelser:', err);
      res.status(500).send('Feil ved henting av øvelser');
    } else { res.json(results);
    }
  });
};

module.exports = { getAllExercises };