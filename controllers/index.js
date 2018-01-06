const express = require('express');
const router = express.Router();

router.use('/player', require('./player'));
router.use('/team', require('./team'));
router.use('/game', require('./game'));
router.use('/pitch', require('./pitch'));

module.exports = router;
