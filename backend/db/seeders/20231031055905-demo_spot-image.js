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
        url: "https://photos.zillowstatic.com/fp/62e5caed8c13a99dc0f3179065947ed5-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/3016ecc93e48af74469000b2d1271606-cc_ft_768.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/310612d81221dd8c84d65c1c4505ec75-cc_ft_768.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/5600229edfd6ad3b97bbf522e5bbc595-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://static.wikia.nocookie.net/spongebob/images/f/f0/Patrick%27s_house.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/1a9a27007870b2720466ed2426b2a32e-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/960c20b71007ac24227780651d3711ec-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/6d61f66ac9efab4a0ac534c49d0a252c-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/78735364cec24b430b7c2d6e2785885f-uncropped_scaled_within_1536_1152.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://static.wikia.nocookie.net/spongebobgalaxy/images/2/23/Squidwards_House.png",
        preview: true
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/772c0820ff668415843d1c8ba7d11907-cc_ft_768.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/fe153cdd1b0859b1057df8026d3f6c01-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/2ed27a88cf22ecf7345d6125b36cf819-cc_ft_768.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/d78be1d4c793fd1376e87164d4778f12-cc_ft_768.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://static.wikia.nocookie.net/spongebobgalaxy/images/f/f0/The_Krusty_Krab2.jpg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/0e1c394ca76f480fab8305611d06df57-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/0698a5bf635ae1457bea7742209f61c5-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/17af1683246b4bba9bbe8fa7b5c7d5f7-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/9c286d6ba55947e7b8242f67d9a212f6-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://static.wikia.nocookie.net/spongefan/images/7/74/Feral_Friends_203.png",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/b9936da871f6e79333e38e74a96eb0d4-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/9a893ee0f39128d5f42c110946be3225-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/8c8f82b79f208d6e639319746759f91c-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/3bb448a7fc5cbfc69ac72b718c882c64-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://static.wikia.nocookie.net/cartoons/images/0/09/The_Chum_Bucket.png",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/37d5dcae94c6a633f458d736f38d71a1-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/5bb56712599c0b43614d5546f2ff2f3f-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/4d00b1ce8ce73d97d5da45a68c845573-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/0c94b6b97013c8528ee00874f10dccb8-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/spongebob/images/1/12/Lighthouse_Louie_001.png",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/1cbf0f5a607f6b4d348c0066a97b5bc3-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/f867ef7209f15ab3c14aa617dabdf315-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/3169c7b7c152640dfce8d9518c296aeb-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/f2c0d5435ed6f1fb7ee308149ffec589-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://static.wikia.nocookie.net/spongebob/images/d/d9/The_Check-Up_144.png",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/00961bb5cc943fd0343ede7b2dbe2722-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/5976624e6c6f4fe558ee5741918f3a89-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/9d4abc10d1c6a05efbd177e01a537f31-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/0adf654905ceb1ea64b6d39bfb2abe06-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://static.wikia.nocookie.net/spongebob/images/e/ed/Sir_Urchin_and_Snail_Fail_105.png",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/3db873e5eb06664e0c632e138674754c-cc_ft_768.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/e6e1482c7e83481576562fac2a6a6a66-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/c274724437088bc00a4971c690c0070d-cc_ft_384.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/b1a2763ddd2fe8d0df937d9eaafaedd4-cc_ft_768.webp",
        preview: false,
      },

    ], options, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
