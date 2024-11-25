'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  class Game_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Game_category.hasMany(models.Game_play_style, {
        foreignKey: 'categoryId',
        as: 'game_play_styles'
      })
    }
  }
  Game_category.init({
    title: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(Game_category.createdAt)).format('LL')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(Game_category.updatedAt)).format('LL')
      }
    }
  }, {
    sequelize,
    modelName: 'Game_category',
  });
  return Game_category;
};
