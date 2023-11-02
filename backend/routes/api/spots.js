const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); //
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { where } = require('sequelize');


// //Get all Spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll() //r3turn all spots
    // console.log(spots)
    let newSpots = [];

    for (let i = 0; i < spots.length; i++) {
        let avgRating = await Review.findOne({
            attribute: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],
            where: { spotId: spots[i].id }
        })
        let previewImage = await SpotImage.findOne({
            where: { spotId: spots[i].id, preview: true }
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
            previewImage: previewImage ? previewImage.url : 'No preview image'
        }

        // console.log(avgRating)
        newSpots.push(newSpot)
    }

    return res.json({
        Spots: newSpots
    })
})


// Get all Spots owned by the Current User

router.get('/current', requireAuth, async(req, res) => {
    const user = req.user;
    let newSpots = [];
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    for (let i = 0; i < spots.length; i++) {
        let avgRating = await Review.findOne({
            attribute: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],
            where: { spotId: spots[i].id }
        })
        let previewImage = await SpotImage.findOne({
            where: { spotId: spots[i].id, preview: true }
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
            previewImage: previewImage ? previewImage.url : 'No preview image'
        }

        // console.log(avgRating)
        newSpots.push(newSpot)
    }

    return res.json({
        Spots: newSpots
    })

 })








module.exports = router;
