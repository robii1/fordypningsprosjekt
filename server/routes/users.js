const express = require('express');
const { getAllUsers, addUser,loginUser } = require('../controllers/brukerController');
const router = express.Router();

router.get('/', getAllUsers); // Hent alle brukere
router.post('/', addUser); // legg till 
router.post('/login', loginUser); // Logg inn bruker

module.exports = router;