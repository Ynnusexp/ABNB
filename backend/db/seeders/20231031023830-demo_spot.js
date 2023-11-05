'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
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
        name: 'Catgirl',
        description: 'she?!',
        price: 89.98,
      },
      {
        ownerId: 4,
        address: '555 Gotham St',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        lat: 34.56,
        lng: 28.76,
        name: 'Gotham Tower',
        description: 'Skyscraper',
        price: 333.33,
      },
      {
        ownerId: 5,
        address: '789 Batcave Rd',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        lat: 25.11,
        lng: 27.76,
        name: 'Batcave Hideout',
        description: 'Heros lair',
        price: 77.77,
      },
      {
        ownerId: 6,
        address: '123 Arkham Rd',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        lat: 12.34,
        lng: 15.67,
        name: 'Arkham Mansion',
        description: 'Spooky residence',
        price: 99.99,
      },
      {
        ownerId: 7,
        address: '456 Wayne St',
        city: 'Gotham',
        state: 'TN',
        country: 'USA',
        lat: 44.76,
        lng: 49.21,
        name: 'Wayne Plaza',
        description: 'Commercial building',
        price: 55.55,
      },
      {
        ownerId: 8,
        address: '999 Riddle Ln',
        city: 'Gotham',
        state: 'WA',
        country: 'USA',
        lat: 36.78,
        lng: 31.12,
        name: 'Riddlers Riddles',
        description: 'Enigma Emporium',
        price: 20.49,
      },
      {
        ownerId: 9,
        address: '321 Catwoman Ave',
        city: 'Gotham',
        state: 'MA',
        country: 'USA',
        lat: 11.11,
        lng: 22.22,
        name: 'Catwomans Den',
        description: 'Feline hideaway',
        price: 66.66,
      },
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
