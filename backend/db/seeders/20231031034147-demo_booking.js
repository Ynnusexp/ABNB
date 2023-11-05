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
    },
    {
      spotId: 4,
      userId: 4,
      startDate: '2010-02-01',
      endDate: '2010-02-02',
    },
    {
      spotId: 5,
      userId: 5,
      startDate: '2010-02-03',
      endDate: '2010-02-04',
    },
    {
      spotId: 6,
      userId: 6,
      startDate: '2010-02-05',
      endDate: '2010-02-06',
    },
    {
      spotId: 7,
      userId: 7,
      startDate: '2010-02-07',
      endDate: '2010-02-08',
    },
    {
      spotId: 8,
      userId: 8,
      startDate: '2010-02-09',
      endDate: '2010-02-10',
    },
    {
      spotId: 9,
      userId: 9,
      startDate: '2010-02-11',
      endDate: '2010-02-12',
    },
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
