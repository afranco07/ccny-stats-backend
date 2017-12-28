module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: DataTypes.STRING,
    })
    /*
    Team.associate = (models) => {
        models.Team.hasOne(models.Player);
    }
    */
    return Team;
}