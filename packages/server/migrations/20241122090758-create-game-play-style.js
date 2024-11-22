'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Game_play_styles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        type: Sequelize.STRING,
        unique: true
      },
      rank: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Game_play_styles');
  }
};
