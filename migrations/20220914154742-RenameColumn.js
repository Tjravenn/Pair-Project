'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Fashiondesigners', 'nodm', 'nameOfDressMaker');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Fashiondesigners', 'nameOfDressMaker', 'nodm');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
