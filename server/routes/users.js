const express = require('express');
const { getAllUsers } = require('../controllers/brukerController');
const router = express.Router();

router.get('/', getAllUsers); // Hent alle brukere

module.exports = router;