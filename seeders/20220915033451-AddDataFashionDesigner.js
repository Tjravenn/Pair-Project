'use strict';
const fs = require('fs');
// const data1 = require('../data/fashiondesigner.json')
// console.log(data);

module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/fashiondesigner.json', 'utf-8'));
    data = data.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
     });
     return queryInterface.bulkInsert('FashionDesigners', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FashionDesigners', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
