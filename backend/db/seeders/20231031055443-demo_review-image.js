'use strict';
const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "www.hello1.com"
      },
      {
        reviewId: 2,
        url: "www.world2.com"
      },
      {
        reviewId: 3,
        url: "www.bye3.com"
      },
      {
        reviewId: 4,
        url: 'www.example4.com',
      },
      {
        reviewId: 5,
        url: 'www.sample5.com',
      },
      {
        reviewId: 6,
        url: 'www.test6.com',
      },
      {
        reviewId: 7,
        url: 'www.website7.com',
      },
      {
        reviewId: 8,
        url: 'www.link8.com',
      },
      {
        reviewId: 9,
        url: 'www.page9.com',
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        reviewId: { [Op.in]: [1,2,3] }
      }, {});
   }
};
