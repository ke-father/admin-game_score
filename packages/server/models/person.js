const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    person_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_person_name"
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_account"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_email"
    },
    balance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    register_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'person',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
      {
        name: "unique_person_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "person_name" },
        ]
      },
      {
        name: "unique_account",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
