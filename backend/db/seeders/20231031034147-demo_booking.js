'use strict';
const { Booking } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      startDate: 2010-1-1,
      endDate: 2010-1-2,
    },
    {
      spotId: 2,
      userId: 2,
      startDate: 2010-1-3,
      endDate: 2010-1-4,
    },
    {
      spotId: 3,
      userId: 3,
      startDate: 2010-1-5,
      endDate: 2010-1-6,
    }
  ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
