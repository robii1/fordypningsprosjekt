const express = require('express');
const { getAllExercises } = require('../controllers/øvelseController');
const router = express.Router();

// Hent alle øvelser
router.get('/', getAllExercises);

module.exports = router;
