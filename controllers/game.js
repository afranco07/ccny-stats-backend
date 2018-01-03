const express = require('express');
const models = require('../models');

const GameController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getGames);
        router.post('/', this.createNewGame);

        return router;
    },

    getGames(req, res) {
        models.Game.findAll({
            include: [{
                model: models.Player,
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
            game.addPlayers([1, 2]);
            res.send('Game created successfully');
        })
        .catch( () => {
            res.status(404).send('Error creating game');
        })
    },
};

module.exports = GameController.registerRouter();