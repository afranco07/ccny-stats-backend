const express = require('express');
const models = require('../models');

const TeamController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getTeams);
        router.post('/', this.createTeam);

        return router;
    },

    getTeams(req, res) {
        models.Team.findAll()
            .then(allTeams => {
                if(!allTeams) {
                    res.status(404).json({ msg: 'No teams found'});
                }
                res.json(allTeams);
            })
            .catch(console.error);
    },

    createTeam(req, res) {
        models.Team.create({
            name: req.body.teamName,
        })
        .then(team => {
            res.send('Team created successfully');
        })
        .catch( () => {
            res.status(404).send('Error creating team');
        })
    },
};

module.exports = TeamController.registerRouter();