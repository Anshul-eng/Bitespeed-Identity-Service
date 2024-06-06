const express = require('express');
const { identifyContact } = require('../controllers/contactController');
const router = express.Router();

router.post('/contacts', identifyContact);

router.get('/welcome', (req, res) => {
    res.send('Welcome to the Bitespeed Identity Reconciliation Service!');
  });

module.exports = router;
