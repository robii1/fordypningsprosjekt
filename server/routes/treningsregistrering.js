const express = require('express');
const { getAllTrainings, addTraining, getTreningBruker, getTreningDato } = require('../controllers/treningsregistreringController');
const router = express.Router();

router.get('/', getAllTrainings); // Hent alle treninger
router.post('/', addTraining); // Legg til en trening
router.get('/:utøverID', getTreningBruker); // treninger for en bruker
router.get('/dato/:dato', getTreningDato); // treninger for en dato

module.exports = router;
