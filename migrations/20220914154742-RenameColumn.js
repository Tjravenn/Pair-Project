'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('FashionDesigners', 'nodm', 'nameOfDressMaker');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('FashionDesigners', 'nameOfDressMaker', 'nodm');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
