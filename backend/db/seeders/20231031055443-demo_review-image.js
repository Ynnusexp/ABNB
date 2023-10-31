'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        reviewId: 1,
        url: "www.hello.com"
      },
      {
        reviewId: 2,
        url: "www.world.com"
      },
      {
        reviewId: 3,
        url: "www.bye.com"
      }
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
