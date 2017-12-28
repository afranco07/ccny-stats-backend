const express = require('express');
const router = express.Router();

router.use('/player', require('./player'));
router.use('/team', require('./team'));

module.exports = router;
