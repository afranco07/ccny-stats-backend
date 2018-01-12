const express = require('express');
const models = require('../models');

const PlayerController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getPlayers);
        router.post('/', this.createPlayer);

        router.put('/:id', this.updatePlayer);

        return router;
    },

    getPlayers(req, res) {
        models.Player.findAll()
            .then(allPlayers => {
                if(!allPlayers) {
                    res.status(404).json({ msg: 'No players found' });
                }
                res.json(allPlayers);
            })
            .catch(console.error);
    },

    createPlayer(req, res) {
        models.Player.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
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
            TeamId: req.body.teamid,
        })
        .then(player => {
            res.send('Player added successfully');
        })
        .catch( () => {
            res.status(404).send('Error added player');
        });
    },

    updatePlayer(req, res) {
        let pitches = this.determineWhichFieldsToUpdate(req.body.result);
        let zone = this.determineZone(req.body.ballStrike);
        let fields = [...pitches, ...zone];
        models.Player.findById(req.params.id)
        .then( player => {
            player.increment(fields, {by: 1});
        })
        .then( player => {
            res.send('Player updated successfully');
        })
        .catch( () => {
            res.status(404).send('Error updating player');
        })
    },

    determineWhichFieldsToUpdate(resultNumber) {
        let fields = [];
        if (resultNumber >= 2 && resultNumber <= 8) {
            fields = ['totalPitches', 'hardHitBalls'];
        } else {
            fields = ['totalPitches'];
        }
        return fields;
    },

    determineZone(ballOrStrike) {
        let fields = [];
        if (ballOrStrike === 'strike') {
            fields = ['pitchesInsideZone'];
        } else {
            fields = ['pitchesOutsideZone'];
        }
        return fields;
    },
};

module.exports = PlayerController.registerRouter();