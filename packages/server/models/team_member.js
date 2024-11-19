const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('team_member', {
    team_member_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'team_id'
      }
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    }
  }, {
    sequelize,
    tableName: 'team_member',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "team_member_id" },
        ]
      },
      {
        name: "team_id",
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
      {
        name: "person_id",
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
    ]
  });
};
