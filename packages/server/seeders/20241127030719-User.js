'use strict';
const bcrypt = require('bcryptjs')

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
    await queryInterface.bulkInsert('Users', [
      {
        account: 'admin',
        password: bcrypt.hashSync('123456', 10),
        nickname: '管理员',
        avatar: '',
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account: 'user',
        password: bcrypt.hashSync('123456', 10),
        nickname: '用户',
        avatar: '',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
