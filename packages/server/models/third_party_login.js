'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Third_party_login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Object.keys(models).forEach(i => console.log)
      models.Third_party_login.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Third_party_login.init({
    user_id: DataTypes.INTEGER,
    third_party_type: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    third_party_id: DataTypes.STRING,
    third_party_token: DataTypes.STRING
  }, {
    id: false,
    sequelize,
    modelName: 'Third_party_login',
  });
  return Third_party_login;
};
