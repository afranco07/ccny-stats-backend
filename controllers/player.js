const express = require('express');
const models = require('../models');

const PlayerController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getPlayers);
        router.post('/', this.createPlayer);

        return router;
    },

    getPlayers(req, res) {
        models.Player.findAll()
            .then(allPlayers => {
                if(!allPlayers) {
                    res.status(404).json({ msg: 'No players foud' });
                }
                res.json(allPlayers);
            })
            .catch(console.error);
    },

    createPlayer(req, res) {
        models.Player.create({
            name: req.body.name,
            jerseyNumber: req.body.jerseyNumber,
            position: req.body.position,
            year: req.body.year,
            hardHitBalls: 0,
            ballsInPlay: 0,
            hhbPercentage: 0,
            o_swingTotal: 0,
            pitchesOutsideZone: 0,
            o_swingPercentage: 0,
            contactOutsideZoneTotal: 0,
            o_contactPercentage: 0,
            z_swingTotal: 0,
            pitchesInsideZone: 0,
            z_swingPercentage: 0,
            contactInZoneTotal: 0,
            z_contactPercentage: 0,
            totalPitches: 0,
            swingAndMissTotal: 0,
            BIPinTheZoneTotal: 0,
            BIPoutsideTheZoneTotal: 0,
            swingPercentage: 0,
            contactPercentage: 0,
        })
        .then(player => {
            res.send('Player added successfully');
        })
        .catch( () => {
            res.status(404).send('Error added player');
        });
    },
};

module.exports = PlayerController.registerRouter();