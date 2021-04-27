'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    content: {
      type: DataTypes.VARBINARY,
      allowNull: false
    },

    coverArt: {
      type: DataTypes.VARBINARY,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, { foreignKey: 'userId'});
    Song.hasMany (models.Comment, { foreignKey: 'songId' });
  };
  return Song;
};
