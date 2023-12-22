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
        url: "https://www.abirthdayplace.com/cdn/shop/products/ABPID51171_1200x1200.jpg",
        preview: true
     },
     {
      spotId: 1,
      url: "https://www.abirthdayplace.com/cdn/shop/products/ABPID51171_1200x1200.jpg",
      preview: true
   },
   {
    spotId: 1,
    url: "https://www.abirthdayplace.com/cdn/shop/products/ABPID51171_1200x1200.jpg",
    preview: true
 },
 {
  spotId: 1,
  url: "https://www.abirthdayplace.com/cdn/shop/products/ABPID51171_1200x1200.jpg",
  preview: true
},
{
  spotId: 1,
  url: "https://www.abirthdayplace.com/cdn/shop/products/ABPID51171_1200x1200.jpg",
  preview: true
},
     {
        spotId: 2,
        url: "https://static.wikia.nocookie.net/spongebob/images/f/f0/Patrick%27s_house.png",
        preview: true
    },
      {
        spotId: 3,
        url: "https://static.wikia.nocookie.net/spongebobgalaxy/images/2/23/Squidwards_House.png",
        preview: true
    },
    {
      spotId: 4,
      url: "https://static.wikia.nocookie.net/spongebobgalaxy/images/f/f0/The_Krusty_Krab2.jpg",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://static.wikia.nocookie.net/spongefan/images/7/74/Feral_Friends_203.png",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://static.wikia.nocookie.net/cartoons/images/0/09/The_Chum_Bucket.png",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://static.wikia.nocookie.net/spongebob/images/1/12/Lighthouse_Louie_001.png",
      preview: true,
    },
    {
      spotId: 8,
      url: "https://static.wikia.nocookie.net/spongebob/images/d/d9/The_Check-Up_144.png",
      preview: true,
    },
    {
      spotId: 9,
      url: "https://static.wikia.nocookie.net/spongebob/images/e/ed/Sir_Urchin_and_Snail_Fail_105.png",
      preview: true,
    },

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
