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
    await queryInterface.bulkInsert('passwordbook_entries', [
      {
        user_id: 1,
        user_name: 'watermelon',
        email: 'watermelon@watermelon.com',
        password: 'watermelon123',
        group_account_id: 3,
      },
      {
        user_id: 1,
        user_name: 'lemon',
        email: 'lemon@lemon.com',
        password: 'lemon123',
        group_account_id: 2,
      },
      {
        user_id: 3,
        user_name: 'kiwi',
        email: 'kiwi@kiwi.com',
        password: 'kiwi123',
        group_account_id: 1,
      },
      {
        user_id: 1,
        user_name: 'kiwi',
        email: 'kiwi@kiwi.com',
        password: 'kiwi123',
        group_account_id: 1,
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
    await queryInterface.bulkDelete('passwordbook_entries');
  },
};
