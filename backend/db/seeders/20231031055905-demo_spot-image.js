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
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        preview: false
     },
     {
        spotId: 2,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        preview: true
    },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        preview: true
    },
    {
      spotId: 4,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      preview: true,
    },
    {
      spotId: 9,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
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
