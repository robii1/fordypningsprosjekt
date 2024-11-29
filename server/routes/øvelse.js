const express = require('express');
const { getAllExercises } = require('../controllers/øvelseController');
const router = express.Router();

router.get('/', getAllExercises); // Hent alle øvelser

module.exports = router;