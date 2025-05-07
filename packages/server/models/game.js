'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gamePlayStyleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: '比赛名称不能为空',
        notEmpty: '比赛名称不能为空'
      }
    },
    logo: DataTypes.STRING,
    signature: DataTypes.TEXT,
    description: DataTypes.TEXT,
    createAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(Game.createdAt)).format('LL')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(Game.updatedAt)).format('LL')
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teamIds: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
