const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_setting', {
    setting_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    setting_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_setting_name"
    },
    setting_value: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'system_setting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "setting_id" },
        ]
      },
      {
        name: "unique_setting_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "setting_name" },
        ]
      },
    ]
  });
};
