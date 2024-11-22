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
    await queryInterface.bulkInsert('Game_categories', [
      {
        title: '篮球',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '足球',
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '德州',
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
