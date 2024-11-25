const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const treningsregistreringRoutes = require('./routes/treningsregistrering');
const øvelseRoutes = require('./routes/øvelse');

const app = express();
const PORT = 3000;
const cors = require('cors');

// Middleware
app.use(bodyParser.json());

app.use(cors());
// Ruter
app.use('/treningsregistrering', treningsregistreringRoutes);
app.use('/øvelse', øvelseRoutes);

// for å teste at jeg får kolbet til

db.getConnection((err, connection) => {
    if (err) {
      console.error('Kan ikke koble til databasen:', err);
    } else {
      console.log('Koblet til databasen!');
      connection.release();
    }
  });

// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
