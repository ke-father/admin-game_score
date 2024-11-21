const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_category', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_category_name"
    }
  }, {
    sequelize,
    tableName: 'game_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "unique_category_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_name" },
        ]
      },
    ]
  });
};
