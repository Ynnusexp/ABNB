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
        userId: 1,
        review: "This is soooo good!!!! :)",
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: "This is just okay :|",
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: "This is very bad!!! >:[",
        stars: 1
      },
      {
        spotId: 4,
        userId: 4,
        review: 'This is very excellent, 10/10!!!!!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 5,
        review: ' This is average :|',
        stars: 3,
      },
      {
        spotId: 6,
        userId: 6,
        review: 'This is terrible!!!!!! 1/5 stars',
        stars: 1,
      },
      {
        spotId: 7,
        userId: 7,
        review: 'This is great, marvelous!!!!!! :D',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 8,
        review: 'This is mediocre, get out of town!!!!!!!!!!!!',
        stars: 3,
      },
      {
        spotId: 9,
        userId: 9,
        review: 'This is horrible, get out of town!!!! >:(',
        stars: 1,
      },
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
