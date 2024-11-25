'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_play_style extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Game_play_style.belongsTo(models.Game_category, {
        foreignKey: 'id',
        as: 'game_category'
      })
    }
  }
  Game_play_style.init({
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    title: DataTypes.STRING,
    rank: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'Game_play_style',
  });
  return Game_play_style;
};
