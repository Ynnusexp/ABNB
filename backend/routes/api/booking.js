const express = require('express')
const { Spot, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()
const { Op } = require("sequelize")


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

        where: {

            spotId: bookings[0].Spot.dataValues.id

        }

    })

    const prvImg = previewImage.dataValues.url

    // console.log(prvImg)

    bookings[0].Spot.dataValues.previewImage = prvImg

    return res.status(200).json({

        Bookings: bookings

    })

});

// Edit Booking
router.put("/:bookingId", requireAuth, async (req, res) => {

    const { bookingId } = req.params;

    const { startDate, endDate } = req.body;

    const { user } = req;

    const newStart = new Date(startDate).getTime();

    const newEnd = new Date(endDate).getTime();

    const err = {};

    if (!startDate) {

        err.startDate = "Please provide a valid Start Date";

    }
    if (!endDate) {

        err.endDate = "Please provide a valid End Date";

    }

    if (err.startDate || err.endDate) {

        return res.status(400).json({

            message: "Bad Request", errors: err

        })

    }

    if (newEnd <= newStart) {

        return res.status(400).json({

            message: "Bad Request",
            errors: {
                endDate: "endDate cannot come before startDate"
            }

        })
    }

    const now = new Date().getTime();

    const after = new Date(endDate).getTime();

    if (now >= after) {

        res.status(403);

        return res.send({

            "message": "Past bookings can't be modified"

        })
    }

        const booking = await Booking.findByPk(bookingId, {

            attributes: [

                "id",
                "spotId",
                "userId",
                "startDate",
                "endDate",
                "createdAt",
                "updatedAt"
            ]

        })

        const bookID = booking.dataValues.userId

        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            })
        }
        if (booking.dataValues.id === bookingId && user.id === bookID) {

            booking.update({

                startDate,
                endDate

            })

            return res.status(200).json(booking)

        } else {

            const bookz = await Booking.findAll({

                where: {

                    spotId: booking.spotId,
                    id: {
                        [Op.not]: booking.id
                     }
                }
            })

            bookz.forEach((booking) => {

                const startDay = new Date(booking.dataValues.startDate).getTime()

                const endDay = new Date(booking.dataValues.endDate).getTime()

                const errs = {};

                if (newStart >= startDay && newStart <= endDay) {

                    errs.startDate = "Start date conflicts with an existing booking"

                }

                if (newEnd >= startDay && newEnd <= endDay) {

                    errs.endDate = "End date conflicts with an existing booking"

                }

                if (newStart < startDay && newEnd > endDay) {

                    errs.startDate = "Start date conflicts with an existing booking"
                    errs.endDate = "End date conflicts with an existing booking"

                }

                if (newStart === startDay) {

                    errs.startDate = "Start date conflicts with an existing booking"

                }

                if (newEnd === endDay) {

                    errs.endDate = "End date conflicts with an existing booking"

                }

                if (errs.startDate || errs.endDate) {

                    return res.status(403).json({

                        message: "Sorry, this spot is already booked for the specified dates",
                        errors: errs

                    });
                }
            });

        if (user.id === booking.userId) {

            booking.update({

                startDate: newStart,
                endDate: newEnd

            });


        await booking.save()

        return  res.status(200).json(booking);

        } else {

                return res.status(403).json({

                message: "Forbidden"

                });

            }

        }

});


//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {

    const { bookingId } = req.params

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {

        return res.status(404).json({

                "message": "Booking couldn't be found"

              })
    }


    if (booking.userId !== req.user.id) {

        return res.status(403).json({

            message: "Forbidden"

        })

    }

    let start = Booking.start;

    booking.start = new Date(start);

    if (start) {

         return res.status(403).json({

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
