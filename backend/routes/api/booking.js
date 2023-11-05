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

    //console.log(bookings[0])

    let previewImage = await SpotImage.findOne({

        where: { spotId: bookings[0].Spot.dataValues.id }

    })

    const prvImg = previewImage.dataValues.url

    // console.log(prvImg)

    bookings[0].Spot.dataValues.previewImage = prvImg

    return res.status(200).json({

        Bookings: bookings

    })
});

// Edit Booking
router.put('/:bookingId', requireAuth, async (req, res) => {

    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId)

    if (!booking) {

        return res.status(404).json({

                message: "Booking couldn't be found",
                statusCode: 404

            })
    }

    try {

        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.update()
        res.json(booking)

    } catch (error) {

        res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }

            })
    }
})


//Delete a Booking
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

        res.status(403).json({

            message: "Bookings that have been started can't be deleted",
            statusCode: 403

        })

    }

    await booking.destroy()

    return res.status(200).json({

        "message": "Successfully deleted"

    })

});

module.exports = router
