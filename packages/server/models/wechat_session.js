'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wechat_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wechat_session.init({
    openid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '微信openid'
    },
    session_key: DataTypes.STRING,
    unionid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Wechat_session',
  });
  return Wechat_session;
};
