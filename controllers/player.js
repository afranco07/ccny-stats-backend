const express = require('express');
const models = require('../models');

const PlayerController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getPlayers);
        router.post('/', this.createPlayer);
        
        router.get('/:id', this.getPlayerWithID);
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

    getPlayerWithID(req, res) {
        models.Player.findById(req.params.id)
        .then( player => {
            res.json(player);
        })
        .catch( () => {
            res.status(404);
        });
    },
    
    updatePlayer(req, res) {
        let pitches = determineWhichFieldsToUpdate(req.body.result);
        let zone = determineZone(req.body.result, req.body.ballStrike, req.body.swing);
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
};

module.exports = PlayerController.registerRouter();

/**
 * 
 * Helper Functions for above routes
 */

function determineWhichFieldsToUpdate(resultNumber) {
    let fields = [];
    if (resultNumber >= 3 && resultNumber <= 8) {
        fields = ['totalPitches', 'hardHitBalls'];
    } else {
        fields = ['totalPitches'];
    }
    if (resultNumber > 0) {
        fields.push('ballsInPlay');
    }
    return fields;
}
    
function determineZone(resultNumber, ballOrStrike, swingValue) {
    let fields = [];
    if (ballOrStrike === 'strike') {
        fields = ['pitchesInsideZone'];
        if (resultNumber > 0) {
            fields.push('BIPinTheZoneTotal');
            fields.push('contactInZoneTotal');
        }
        if (swingValue) {
            fields.push('o_swingTotal');
        }
    } else {
        fields = ['pitchesOutsideZone'];
        if (resultNumber > 0) {
            fields.push('BIPoutsideTheZoneTotal');
            fields.push('contactOutsideZoneTotal');
        }
        if(swingValue) {
            fields.push('z_swingTotal');
        }
    }
    return fields;
}
