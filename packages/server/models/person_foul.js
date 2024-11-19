const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person_foul', {
    person_foul_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'game_id'
      }
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
    },
    foul_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    foul_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'person_foul',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "person_foul_id" },
        ]
      },
      {
        name: "game_id",
        using: "BTREE",
        fields: [
          { name: "game_id" },
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
