const sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const queryFilters = require('../../utils/queryfilters.js');

const validateSpot = [

    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isFloat({ min: 0})
        .withMessage("Price per day is required"),
    handleValidationErrors

]

const validateReview = [

    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({
            min: 1,
            max: 5
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors

]


router.get("/", queryFilters, async (req, res) => {

    const {

      limit,
      offset,
      size,
      page,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice,
      where,

    } = req.pagination;

    const spots = await Spot.unscoped().findAll({

      where,
      include: [

        {
          model: SpotImage,
          attributes: [
            "url"
        ],

        },

      ],

      limit,
      offset,
    });

//
    const toJson = [];

    spots.forEach(spot => {

    const format = spot.toJSON();

    format.lat = parseFloat(format.lat);
    format.lng = parseFloat(format.lng);
    format.price = parseFloat(format.price);

    toJson.push(format);

    })


    for (const spot of toJson) {

        const spotId = spot.id;

        const sumRating = await Review.sum("stars", {

             where: { spotId }

            });

        const count = await Review.count({

            where: {

                spotId

            }

        });

        if (count > 0) {

            spot.avgRating = sumRating / count;

          } else {

            spot.avgRating = 'Spot not rated';

          }

        if (spot.SpotImages[0]) {

          spot.previewImage = spot.SpotImages[0].url;

        } else {

          spot.previewImage = 'No preview image';

        }

        delete spot.SpotImages;
      }

    return res.json({

        Spots: toJson, page, size

    })

  });


// Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res) => {

    const user = req.user;

    let newSpots = [];

    const spots = await Spot.findAll({

        where: {

            ownerId: user.id

        },

        // include: [ Review, SpotImage ]

    })

    for (let i = 0; i < spots.length; i++) {

        let avgRating = await Review.findOne({

            attribute: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],

            where: {

                spotId: spots[i].id

            }

        })

        let previewImage = await SpotImage.findOne({

            where: {

                spotId: spots[i].id, preview: true

            }

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
            avgRating: avgRating ? avgRating: "spot has not been rated",
            previewImage: previewImage ? previewImage.url : 'No preview image'

        }

        // console.log(avgRating)
        newSpots.push(newSpot)
    }

    return res.json({

        Spots: newSpots

    })

});

//Get details of a Spot from an id
router.get('/:spotsId', async (req, res) => {

    const user = req.user;

    let newSpots = [];


    const spots = await Spot.findByPk(req.params.spotsId)


    if (!spots) {

        return res.status(404).json({

             message: "Spot couldn't be found"

        })

        }

    const owners = await User.findAll({

        where: {

            id: user.id

        },

        attributes: {

            exclude: ['username']
        }

    })

        let avgRating = await Review.findOne({

            attribute: [

                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']

            ],

            where: {

                spotId: spots.id

            }

        })

        let previewImage = await SpotImage.findOne({

            where: {

                spotId: spots.id, preview: true

            }

        })

        const spotImg = await SpotImage.findAll({

            where: {

                spotId: spots.id

            },
            attributes: {

                exclude: ['createdAt', 'updatedAt', 'spotId']

            }

        });

        //  console.log(spotImg)

        let newSpot = {

            id: spots.id,
            ownerId: spots.ownerId,
            address: spots.address,
            city: spots.city,
            state: spots.state,
            country: spots.country,
            lat: spots.lat,
            lng: spots.lng,
            name: spots.name,
            description: spots.description,
            price: spots.price,
            createdAt: spots.createdAt,
            updatedAt: spots.updatedAt,
            avgRating: avgRating ? avgRating: "spot has not been rated",
            previewImage: previewImage ? previewImage.url : 'No preview image',
            SpotImages: spotImg,
            Owner: owners[0]

        }

        newSpots.push(newSpot)

    return res.json({

        Spots: newSpots

    })

});

//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    try {

        const spotz = await Spot.create({

            ownerId: req.user.id,
            address, city, state, country, lat, lng, name, description, price

        })

        let spot = spotz.toJSON()

        spot.lat = parseFloat(spot.lat);
        spot.lng = parseFloat(spot.lng);
        spot.price = parseFloat(spot.price);

        res.status(201).json({

            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            updatedAt: spot.updatedAt,
            createdAt: spot.createdAt

        })

    } catch (error) {

        next(error)
    }
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { url, preview } = req.body;

    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)

    if (spot) {
        if (spot.ownerId !== req.user.id) {

            return res.status(403).json({

                message: "Forbidden"

            })
        }
        const spotImage = await SpotImage.create({

            spotId: req.params.spotId,
            url: url,
            preview: preview

        })

        return res.json({

            id: spotImage.spotId,
            url: spotImage.url,
            preview: true

        })

    } else {

        return res.status(404).json({

            "message": "Spot couldn't be found"

        })
    }
});

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const { spotId } = req.params

    const { user } = req

    const spots = await Spot.findByPk(spotId)

    if (!spots) {

        return res.status(404).json({

            message: "Spot couldn't be found",

        })
    }

    if (spots.ownerId !== user.id) {

        return res.status(403).json({

            message: "Forbidden"

        })

    }
        spots.address = address,
        spots.city = city,
        spots.state = state,
        spots.country = country,
        spots.lat = lat,
        spots.lng = lng,
        spots.name = name,
        spots.description = description,
        spots.price = price

    await spots.save()

    res.json(spots)

});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const deleteSpot = await Spot.findByPk(spotId);

    // console.log(deleteSpot)
    // console.log(spotId)

    if(!deleteSpot){

        return res.status(404).json({

            "message": "Spot couldn't be found"

        })
    }
    if (deleteSpot.ownerId !== req.user.id) {

        return res.status(403).json({

            message: "Forbidden"

        })

    }

    if (deleteSpot) {

        await deleteSpot.destroy();

        return res.json({

            "message": "Successfully deleted"

        })

    }

});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {

        return res.status(404).json({

             message: "Spot couldn't be found"

            })
    }

    const reviews = await Review.findAll({

        where: {

            spotId: req.params.spotId

        },

        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']

            }, {

                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    res.status(200).json({

        Reviews: reviews

    })
});


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {

    const { review, stars } = req.body

    const spotId = req.params.spotId

    const spotCheck = await Spot.findByPk(spotId)

    if (!spotCheck) {

        return res.status(404).json({

            "message": "Spot couldn't be found"

        })

    }

    const reviewCheck = await Review.findAll({

        where: {

            userId: req.user.id,
            // spotId: spotId

        }

    })
    let currCheck = false

    reviewCheck.forEach(review => {

        let reviewJson = review.toJSON()

        if(reviewJson.spotId == spotCheck.id) currCheck = true

    });


    if (currCheck) {


        return res.status(500).json({

            "message": "User already has a review for this spot"

        })
    }


    try {

        const spot = await Review.create({

            userId: req.user.id,
            spotId: spotId,
            review: review,
            stars: stars

        })

        return res.json(spot)

    } catch (error) {

        next(error)

    }
})


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const spot = req.params.spotId

    const checkSpot = await Spot.findByPk(spot)

    //Error response: Couldn't find a Spot with the specified id
    if (!checkSpot) {

        return res.status(404).json({

            "message": "Spot couldn't be found"

        })

    }

    const bookings = await Booking.findAll({

        where: {

            spotId: req.params.spotId

        },

        include: [

            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },

        ]
    })

    //console.log(bookings)
    return res.status(200).json({

        Bookings: bookings

    })
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;

    const userId = user.id;

    const spot = await Spot.findByPk(req.params.spotId);

    const body = req.body;

    if (!spot) {

        return res.status(404).json({

            message: "Spot couldn't be found"

        })
    }
    console.log(spot.ownerId)
    if (spot.ownerId === user.id) {

        return res.status(403).json({

            message: "You cannot make a booking for a spot you own"

        });
    }

    const bookings = await Booking.findAll({

        where: {

            spotId: spot.id

        }

    });

    const starting = new Date(body.startDate)

    const ending = new Date(body.endDate)

    for (const books of bookings) {

        const started = new Date(books.startDate)

        const ended = new Date(books.endDate)

        if (starting.getTime() === started.getTime() && ending.getTime() === ended.getTime()) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }

            })
        }

        if (starting.getTime() === started.getTime()) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date on an existing start date"
                }

            })
        }

        if (starting.getTime() === ended.getTime()) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date on an existing end date"
                }

            })
        }

        if (ending.getTime() === started.getTime()) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date on an existing start date"
                }

            })
        }

        if (ending.getTime() === ended.getTime()) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date on an existing end date"
                }

            })
        }

        if (starting > started && ending < ended) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }

            })
        }

        if (starting >= started && starting < ended) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date during an existing booking"
                }

            })

        }

        if (ending > started && ending <= ended) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date during an existing booking"
                }

            })
        }

        if (starting <= started && ending >= ended) {

            return res.status(403).json({

                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }

            })
        }
    }

    if (starting.getTime() === ending.getTime()) {

        return res.status(400).json({

            message: "Bad Request",
            errors: {
                startDate: "Start and end date are the same",
                endDate: "Start and end date are the same"
            }

        })
    }

    if (ending.getTime() < starting.getTime()) {

        return res.status(400).json({

            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate" //
            }

        })
    }

    body.userId = userId;
    body.spotId = spot.id;

    const newBooks = await Booking.create(body);
    await newBooks.save()

    res.json(newBooks);

});

module.exports = router;
