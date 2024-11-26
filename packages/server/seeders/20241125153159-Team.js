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
    await queryInterface.bulkInsert('Teams', [
      {
        name: '队伍A',
        gameId: 1,
        logo: '',
        signature: '队伍A',
        description: '队伍A',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '队伍B',
        gameId: 1,
        logo: '',
        signature: '队伍B',
        description: '队伍B',
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '队伍C',
        gameId: 2,
        logo: '',
        signature: '队伍C',
        description: '队伍C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '队伍D',
        gameId: 2,
        logo: '',
        signature: '队伍D',
        description: '队伍D',
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
