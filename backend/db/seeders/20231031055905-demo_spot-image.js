'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "www.hola1.com",
        preview: false
     },
     {
        spotId: 2,
        url: "www.chao2.com",
        preview: true
    },
      {
        spotId: 3,
        url: "www.morning3.com",
        preview: true
    },
    {
      spotId: 4,
      url: 'www.evening4.com',
      preview: true,
    },
    {
      spotId: 5,
      url: 'www.night5.com',
      preview: false,
    },
    {
      spotId: 6,
      url: 'www.sunset6.com',
      preview: true,
    },
    {
      spotId: 7,
      url: 'www.midday7.com',
      preview: false,
    },
    {
      spotId: 8,
      url: 'www.sunrise8.com',
      preview: true,
    },
    {
      spotId: 9,
      url: 'www.dawn9.com',
      preview: false,
    }

    ], options, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
