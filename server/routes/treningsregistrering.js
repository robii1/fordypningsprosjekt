const express = require('express');
const { getAllTrainings, addTraining, getTrainingsByDate} = require('../controllers/treningsregistreringController');
const router = express.Router();

router.get('/', getAllTrainings); // Hent alle treningsøkter - må tilpasses id
router.post('/', addTraining); // Legg til en treningsøkt -
router.get('/dato/:dato', getTrainingsByDate); // Hent treningsøkter for en  dato

module.exports = router;