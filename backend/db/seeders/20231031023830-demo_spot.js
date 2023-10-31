'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        ownerId: 1,
        address: '123 Gotham ln',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        lat: 24.25,
        lng: 25.98,
        name: 'Batman',
        description: 'where',
        price: 11.76,
      },
      {
        ownerId: 2,
        address: '456 Gotham ln',
        city: 'Bat City',
        state: 'BC',
        country: 'CANADA',
        lat: 25.56,
        lng: 32.76,
        name: 'Robin',
        description: 'is',
        price: 24.42,
      },
      {
        ownerId: 3,
        address: '789 Gotham ln',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 12.12,
        lng: 13.21,
        name: 'catgirl',
        description: 'she?!',
        price: 89.98,
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        city: { [Op.in]: ['Gotham','Bat City','San Diego'] }
      }, {});
    }
};
