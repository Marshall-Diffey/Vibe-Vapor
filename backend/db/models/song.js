'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      DataTypes.STRING(100),
      allowNull: false
    },

    content: {
      DataTypes.VARBINARY,
      allowNull: false
    },

    coverArt: {
      DataTypes.VARBINARY,
      allowNull: false
    },
    userId: {
      DataTypes.INTEGER,
      allowNull: false
    },

    userPageId: {
      DataTypes.INTEGER,
      allowNull: false
    }

  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};
