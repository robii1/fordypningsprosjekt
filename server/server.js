const db = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const øvelseRoutes = require('./routes/øvelse');
const brukerRoutes = require('./routes/users')
const treningsregistreringRoutes = require('./routes/treningsregistrering');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Ruter
app.use('/exercises', øvelseRoutes);
app.use('/sessions', treningsregistreringRoutes);
app.use('/users', brukerRoutes);

// for å teste at jeg får kolbet til
db.getConnection((err, connection) => {
    if (err) {
      console.error('database feilkobling:', err);
    } else {
      console.log('Koblet til databasen!');
      connection.release();
    }
  });

// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på http://127.0.0.1:${PORT}`);
});
