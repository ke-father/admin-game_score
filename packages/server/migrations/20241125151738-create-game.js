'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false,
        comment: '比赛类别'
      },
      gamePlayStyleId: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false,
        comment: '比赛类型'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '比赛名称'
      },
      logo: {
        type: Sequelize.STRING,
        comment: '队伍logo'
      },
      signature: {
        type: Sequelize.TEXT,
        comment: '队伍签名'
      },
      description: {
        type: Sequelize.TEXT,
        comment: '比赛简介'
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
    await queryInterface.dropTable('Games');
  }
};
