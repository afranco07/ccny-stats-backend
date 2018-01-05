module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game',{
    });

    Game.associate = (models) => {
        models.Game.belongsTo(models.Team);
        models.Game.belongsToMany(models.Player, { through: 'PlayerGames'});
    }
    return Game;
}