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




//Delete an existing booking.
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const {bookingId} = req.params
    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json(
            {
                "message": "Booking couldn't be found"

              })
    }

    let start = Booking.start;

    booking.start = new Date(start);

    if (start) {
        res.status(403).json(
            {
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })

    }

    await booking.destroy()

    return res.status(200).json({
        "message": "Successfully deleted"
    })

})


/*
router.delete('/:bookingId', requireAuth, async (req, res) => {

    let startDate = Booking.startDate
    booking.startDate = new Date(startDate)
    if (startDate) {
        res.status(403).json(        {
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })

});
*/










module.exports = router
