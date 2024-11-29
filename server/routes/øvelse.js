const express = require('express');
const { getAllExercises, getØvelseTrening } = require('../controllers/øvelseController');
const router = express.Router();

router.get('/', getAllExercises); // alle øvelser
router.get('/treningsregistrering/:treningsregistreringID', getØvelseTrening); // øvelser for en treningsregistrering

module.exports = router;
