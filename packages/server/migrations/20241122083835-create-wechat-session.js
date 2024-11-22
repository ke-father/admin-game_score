'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wechat_sessions', {
      openid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      session_key: {
        type: Sequelize.STRING
      },
      unionid: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Wechat_sessions');
  }
};
