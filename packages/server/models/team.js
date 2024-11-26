'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    gameId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: DataTypes.STRING,
    signature: DataTypes.STRING,
    description: DataTypes.TEXT,
    rank: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    foul: DataTypes.INTEGER,
    pause: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
