const express = require('express');
const { getAllTrainings, addTraining } = require('../controllers/treningsregistreringController');
const router = express.Router();

// Hent alle treninger
router.get('/', getAllTrainings);

// Legg til ny trening
router.post('/', addTraining);

module.exports = router;
