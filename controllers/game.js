const express = require('express');
const models = require('../models');

const GameController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getGames);
        router.post('/', this.createNewGame);

        router.get('/:id', this.getLineupFromGameWithID);

        return router;
    },

    getGames(req, res) {
        models.Game.findAll({
            include: [{
                model: models.Player,
            }, {
                model: models.Team,
            }]
        })
        .then(allGames => {
            if(!allGames) {
                res.status(404).json({ msg: 'No games found' });
            }
            res.json(allGames);
        })
        .catch(console.error);
    },

    createNewGame(req, res) {
        models.Game.create({
            TeamId: req.body.teamid,
        })
        .then(game => {
            //Get Players here
            let lineup = [
                req.body.player1,
                req.body.player2,
                req.body.player3,
                req.body.player4,
                req.body.player5,
                req.body.player6,
                req.body.player7,
                req.body.player8,
                req.body.player9,
                req.body.player10,
            ];
            game.addPlayers(lineup);
            res.send('Game created successfully');
        })
        .catch( () => {
            res.status(404).send('Error creating game');
        })
    },

    getLineupFromGameWithID(req, res) {
        models.Game.findById(req.params.id, { include: models.Player })
        .then( game => {
            res.json(game.Players);
        })
        .catch( () => {
            res.status(404);
        })
    },
};

module.exports = GameController.registerRouter();