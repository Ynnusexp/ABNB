'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '124 Conch St',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -14.56,
        lng: -18.21,
        name: 'SpongeBob Pineapple',
        description: 'The finest Pineapple under the sea, SpongeBob lives here',
        price: 11.76,
    },
    {
        ownerId: 2,
        address: '345 Rock Bottom Rd',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -12.34,
        lng: -15.67,
        name: 'Patrick Rock',
        description: 'Patrick Star lives here',
        price: 24.42,
    },
    {
        ownerId: 3,
        address: '678 Jellyfish Fields',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -10.11,
        lng: -11.22,
        name: 'Squidward Easter Island Head',
        description: 'Squidward lives here, you can occasionally hear him pla his clarinet',
        price: 89.98,
    },
    {
        ownerId: 4,
        address: '555 Krusty Krab Ln',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -5.67,
        lng: -7.89,
        name: 'Krusty Krab',
        description: 'Home of the Krabby Patty and the secret formula, Mr Krab is the owner',
        price: 333.33,
    },
    {
        ownerId: 5,
        address: '789 Sandy Cheeks Blvd',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -2.22,
        lng: -4.44,
        name: 'Sandy Cheeks Dome',
        description: 'Sandy Cheeks lives here, she is a scientist and karate expert',
        price: 77.77,
    },
    {
        ownerId: 6,
        address: '123 Chum Bucket Dr',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -7.89,
        lng: -9.87,
        name: 'Chum Bucket',
        description: 'Competitor to the Krusty Krab, Plankton lives here',
        price: 99.99,
    },
    {
        ownerId: 7,
        address: '456 Mrs. Puff Ave',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -3.45,
        lng: -5.67,
        name: 'Mrs. Puff Boating School',
        description: 'Teaches boating to SpongeBob',
        price: 55.55,
    },
    {
        ownerId: 8,
        address: '999 Plankton Pl',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -1.23,
        lng: -2.34,
        name: 'Plankton Lab',
        description: 'Looks like a bucket...',
        price: 20.49,
    },
    {
        ownerId: 9,
        address: '321 Mermaid Man Ln',
        city: 'Bikini Bottom',
        state: 'BB',
        country: 'Pacific Ocean',
        lat: -6.78,
        lng: -8.76,
        name: 'Mermaid Man Retirement Home',
        description: 'Home for retired superheroes',
        price: 66.66,
    }

    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        ownerId: { [Op.in]: [1,2,3] }
      }, {});
    }
};
