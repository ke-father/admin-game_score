const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('team', {
    team_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    team_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_team_name"
    }
  }, {
    sequelize,
    tableName: 'team',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
      {
        name: "unique_team_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "team_name" },
        ]
      },
    ]
  });
};
