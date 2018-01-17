module.exports = (sequelize, DataTypes) => {
    const Pitch = sequelize.define('Pitch', {
        ballOrStrike: DataTypes.STRING,
        result: DataTypes.INTEGER,
    });

    Pitch.associate = (models) => {
        models.Pitch.belongsTo(models.Player);
    };

    return Pitch;
}