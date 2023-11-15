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
    await queryInterface.bulkInsert('users', [
      {
        email: 'watermelon@watermelon.com',
        password: 'watermelon123',
        profile_photo:
          'https://images.unsplash.com/photo-1539248519424-b4b8f9a99a4a?q=80&w=2219&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        email: 'lemon@lemon.com',
        password: 'lemon123',
        profile_photo:
          'https://images.unsplash.com/photo-1580412092181-219a7b10e6ce?q=80&w=2505&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        email: 'kiwi@kiwi.com',
        password: 'kiwi123',
        profile_photo:
          'https://images.unsplash.com/photo-1584209742773-f7b461564449?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users');
  },
};
