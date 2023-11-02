const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); //
const express = require('express');
const router = express.Router();

// const { requireAuth } = require('../../utils/auth.js');
// const { where } = require('sequelize');
// const spotimage = require('../../db/models/spotimage');
// const spot = require('../../db/models/spot');

router.get('/', async(req, res) => {
let spots = await Spot.findAll() //r3turn all spots
// console.log(spots)
let newSpots = [];

 for( let i = 0; i < spots.length; i++) {
    let avgRating = await Review.findOne({
        attribute: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ],
        where: {spotId: spots[i].id}
    })
    let previewImg = await SpotImage.findOne({
        where: {spotId: spots[i].id, preview: true}
    })

    let newSpot = {
        id: spots[i].id,
        ownerId: spots[i].ownerId,
        address: spots[i].address,
        city: spots[i].city,
        state: spots[i].state,
        country: spots[i].country,
        lat: spots[i].lat,
        lng: spots[i].lng,
        name: spots[i].name,
        description: spots[i].description,
        price: spots[i].price,
        createdAt: spots[i].createdAt,
        updatedAt: spots[i].updatedAt,
        avgRating: avgRating.stars,
        previewImg: previewImg ? previewImg.url : 'No preview image'
    }

    // console.log(avgRating)
    newSpots.push(newSpot)
    }

    return res.json({
        Spots: newSpots
    })
})


// router.get('/current', requireAuth, async(req, res) => {
//     const vari = await Spot.findAll()
//     return res.json({
//         Spots: vari
//     })
//  })


module.exports = router;
