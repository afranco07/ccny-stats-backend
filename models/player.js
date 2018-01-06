module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        jerseyNumber: DataTypes.INTEGER,
        position: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        hardHitBalls: DataTypes.INTEGER,
        ballsInPlay: DataTypes.INTEGER,
        hhbPercentage: DataTypes.DOUBLE,
        o_swingTotal: DataTypes.INTEGER,
        pitchesOutsideZone: DataTypes.INTEGER,
        o_swingPercentage: DataTypes.DOUBLE,
        contactOutsideZoneTotal: DataTypes.INTEGER,
        o_contactPercentage: DataTypes.DOUBLE,
        z_swingTotal: DataTypes.INTEGER,
        pitchesInsideZone: DataTypes.INTEGER,
        z_swingPercentage: DataTypes.DOUBLE,
        contactInZoneTotal: DataTypes.INTEGER,
        z_contactPercentage: DataTypes.DOUBLE,
        totalPitches: DataTypes.INTEGER,
        swingAndMissTotal: DataTypes.INTEGER,
        BIPinTheZoneTotal: DataTypes.INTEGER,
        BIPoutsideTheZoneTotal: DataTypes.INTEGER,
        swingPercentage: DataTypes.DOUBLE,
        contactPercentage: DataTypes.DOUBLE,
    });

    Player.associate = (models) => {
        models.Player.belongsTo(models.Team);
        models.Player.belongsToMany(models.Game, { through: 'PlayerGames'});
        models.Player.hasMany(models.Pitch);
    }
    return Player;
}