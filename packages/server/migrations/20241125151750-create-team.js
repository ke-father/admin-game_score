'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '队伍id'
      },
      gameId: {
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '比赛id',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        comment: '队伍名称',
        allowNull: false
      },
      logo: {
        type: Sequelize.STRING,
        comment: '队伍logo'
      },
      signature: {
        type: Sequelize.STRING,
        comment: '队伍签名'
      },
      description: {
        type: Sequelize.TEXT,
        comment: '队伍简介'
      },
      rank: {
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '队伍排序 1 主场队伍 2-n 客场队伍'
      },
      score: {
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '队伍得分'
      },
      foul: {
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '队伍犯规'
      },
      pause: {
        type: Sequelize.INTEGER.UNSIGNED,
        comment: '队伍暂停'
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
    await queryInterface.dropTable('Teams');
  }
};
