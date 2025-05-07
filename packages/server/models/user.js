'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Third_party_login, {
        foreignKey: 'user_id',
        as: 'third_party_logins'
      })
    }
  }
  User.init({
    account: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(User.createdAt)).format('LL')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get () {
        return moment(this.getDataValue(User.updatedAt)).format('LL')
      }
    },
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
