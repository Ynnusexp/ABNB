'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
    {
      spotId: 1,
      userId: 21,
      startDate: 2010-1-1,
      endDate: 2010-1-2,
    },
    {
      spotId: 2,
      userId: 22,
      startDate: 2010-1-3,
      endDate: 2010-1-4,
    },
    {
      spotId: 3,
      userId: 23,
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
