const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()
//const { Op } = require("sequelize")


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const bookings = await Booking.findAll({

        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price'
                ]
            },

        ]
    })
    console.log(bookings[0])
    let previewImage = await SpotImage.findOne({
        where: { spotId: bookings[0].Spot.dataValues.id }
    })

    const prvImg = previewImage.dataValues.url

    // console.log(prvImg)

    bookings[0].Spot.dataValues.previewImage = prvImg

    return res.status(200).json({
        Bookings: bookings
    })
})






module.exports = router
