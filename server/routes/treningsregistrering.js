const express = require('express');
const { getAllTrainings, addTraining, getTrainingsByDate} = require('../controllers/treningsregistreringController');
const router = express.Router();

router.get('/', getAllTrainings); // Hent alle treningsøkter
router.post('/', addTraining); // Legg til en treningsøkt
router.get('/dato/:dato', getTrainingsByDate); // Hent treningsøkter for en spesifikk dato

module.exports = router;