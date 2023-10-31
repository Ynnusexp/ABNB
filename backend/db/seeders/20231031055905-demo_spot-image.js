'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        spotId: 1,
        url: "www.hola.com",
        preview: false
     },
     {
        spotId: 2,
        url: "www.chao.com",
        preview: true
    },
      {
        spotId: 3,
        url: "www.morning.com",
        preview: true
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