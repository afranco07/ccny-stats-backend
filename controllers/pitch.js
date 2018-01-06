const express = require('express');
const models = require('../models');

const PitchController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getPitches);
        router.post('/', this.createNewPitch);

        return router;
    },

    getPitches(req, res) {
        models.Pitch.findAll()
        .then(allPitches => {
            if(!allPitches) {
                res.status(404).json({ msg: 'No pitches found' });
            }
            res.json(allPitches);
        })
        .catch(console.error);
    },

    createNewPitch(req, res) {
        models.Pitch.createNewPitch({
            ballOrStrike: req.body.ballStrike,
            result: req.body.result,
        })
        .then(pitch => {
            game.setPlayer(req.body.player);
            res.send('Pitch added')
        })
        .catch( () => {
            res.status(404).send('Error adding pitch');
        });
    },
};

module.exports = PitchController.registerRouter();