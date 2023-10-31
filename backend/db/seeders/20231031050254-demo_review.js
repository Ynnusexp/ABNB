'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 40,
        review: "good",
        stars: 4
      },
      {
        spotId: 2,
        userId: 41,
        review: "okay",
        stars: 3
      },
      {
        spotId: 3,
        userId: 42,
        review: "bad",
        stars: 1
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        stars: { [Op.in]: [4,3,1] }
      }, {});
    }
};
