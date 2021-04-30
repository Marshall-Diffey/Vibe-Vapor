'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },

    coverArt: {
      type: DataTypes.BLOB,
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
