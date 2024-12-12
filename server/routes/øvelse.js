const express = require('express');
const { getAllExercises } = require('../controllers/øvelseController');
const router = express.Router();

router.get('/', getAllExercises); // alle øvelser

module.exports = router;