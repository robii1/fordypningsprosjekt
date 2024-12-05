const express = require('express');
const { getAllUsers, addUser } = require('../controllers/brukerController');
const router = express.Router();

router.get('/', getAllUsers); // Hent alle brukere
router.post('/', addUser); // legg till 


module.exports = router;