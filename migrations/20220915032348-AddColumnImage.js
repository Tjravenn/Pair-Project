'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Dresses', 'imageUrl', Sequelize.STRING);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Dresses', 'imageUrl');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
