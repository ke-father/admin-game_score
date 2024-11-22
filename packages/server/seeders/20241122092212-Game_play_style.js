'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Game_play_styles', [
      {
        category_id: 1,
        title: '1v1篮球单挑赛',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        title: '3v3篮球半场赛',
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        title: '5v5篮球全场赛',
        rank: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        title: '篮球三分赛',
        rank: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        title: '定点罚球',
        rank: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        title: '1v1足球单挑赛',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        title: '点球大赛',
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        title: '5v5足球全场赛',
        rank: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
