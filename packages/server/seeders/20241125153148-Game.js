'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Games', [
            {
                categoryId: 1,
                gamePlayStyleId: 1,
                name: '篮球1v1单挑赛',
                logo: '',
                signature: '篮球1v1单挑赛',
                description: '篮球1v1单挑赛',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                categoryId: 1,
                gamePlayStyleId: 2,
                name: '篮球3v3半场赛',
                logo: '',
                signature: '篮球3v3半场赛',
                description: '篮球3v3半场赛',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                categoryId: 1,
                gamePlayStyleId: 3,
                name: '篮球5v5全场赛',
                logo: '',
                signature: '篮球5v5全场赛',
                description: '篮球5v5全场赛',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                categoryId: 1,
                gamePlayStyleId: 4,
                name: '篮球7v7全场赛',
                logo: '',
                signature: '篮球7v7全场赛',
                description: '篮球7v7全场赛',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                categoryId: 1,
                gamePlayStyleId: 5,
                name: '篮球9v9全场赛',
                logo: '',
                signature: '篮球9v9全场赛',
                description: '篮球9v9全场赛',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
