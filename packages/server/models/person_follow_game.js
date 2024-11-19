const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person_follow_game', {
    follow_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'game_id'
      }
    },
    follow_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'person_follow_game',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "follow_id" },
        ]
      },
      {
        name: "person_id",
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
      {
        name: "game_id",
        using: "BTREE",
        fields: [
          { name: "game_id" },
        ]
      },
    ]
  });
};
