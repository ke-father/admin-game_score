const Sequelize = require('sequelize');
const Game = require('./game');
module.exports = function (sequelize, DataTypes) {
    const game_category = sequelize.define('game_category',
        {
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
        },
        {
            sequelize,
            tableName: 'game_category',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "category_id"},
                    ]
                },
                {
                    name: "unique_category_name",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "category_name"},
                    ]
                },
            ]
        }
    )

    game_category.belongsTo(Game)
    return game_category;
};
