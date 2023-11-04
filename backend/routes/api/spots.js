const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); //
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
        .notEmpty()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters")
        //.notEmpty()
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
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

const validateBooking = [
    check('startDate')
        .custom(async val => {

            const checkStart = await Booking.findAll({
                where: {
                    startDate: val
                }
            })

            if (checkStart.length) {
                throw new Error("Start date conflicts with an existing booking")
            }
            return true
        })
        .withMessage("Sorry, this spot is already booked for the specified dates"),
    check('endDate')
    .custom(async val => {
        const checkStart = await Booking.findAll({
            where: {
                startDate: val
            }
        })

        if (checkStart.length) {
            throw new Error("Start date conflicts with an existing booking")
        }
        return true
    })
    .withMessage("Sorry, this spot is already booked for the specified dates"),
    handleValidationErrors

]

// //Get all Spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll() //r3turn all spots
    // console.log(spots)
    let newSpots = [];

    for (let i = 0; i < spots.length; i++) {
        let avgRating = await Review.findOne({
            attribute: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'] //eagerloading aggregatd datta
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

router.get('/current', requireAuth, async (req, res) => {
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

//Get details of a Spot from an id
router.get('/:spotsId', async (req, res) => {

    const user = req.user;
    let newSpots = [];
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    const owners = await User.findAll({
        where: { id: user.id },
        attributes: {
            exclude: ['username']
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

        const spotImg = await SpotImage.findAll({
            where: { spotId: spots[0].id },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'spotId']
            }
        })

        //  console.log(spotImg)


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
            previewImage: previewImage ? previewImage.url : 'No preview image',
            SpotImages: spotImg,
            Owner: owners[0]
        }

        newSpots.push(newSpot)
    }
    return res.json({
        Spots: newSpots
    })

})
//Create aSpot
router.post('/', validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    try {
        const spot = await Spot.create({
            ownerId: req.user.id,
            address, city, state, country, lat, lng, name, description, price
        })
        return res.json(spot)

    } catch (error) {
        next(error)
    }
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { url, preview } = req.body;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)


    if (spot) {
        const spotImage = await SpotImage.create({
            spotId: req.params.spotId,
            url: url,
            preview: preview
        })

        return res.json({
            id: spotImage.spotId,
            url: spotImage.url,
            preview: spotImage.url

        })

    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
})

//Edit a Spot

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { spotId } = req.params
    const spots = await Spot.findByPk(spotId)

    try {
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

    } catch (err) {

        if (!spots) {

            return res
                .status(404)
                .json({
                    statusCode: 404,
                    message: "Spot couldn't be found"
                })
        }
        next(err)
    }
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const deleteSpot = await Spot.findByPk(spotId);

    console.log(deleteSpot)
    console.log(spotId)

    if (deleteSpot) {

        await deleteSpot.destroy();

        return res.json({
            "message": "Successfully deleted"
        })

    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
})

//Get all Reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res) => {
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


    res.status(200).json({ Reviews: reviews })
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {

    const { review, stars } = req.body

    const spotId = req.params.spotId

    const spotCheck = await Spot.findByPk(spotId)

    if (!spotCheck) {
        return res.status(404).json(
            {
                "message": "Spot couldn't be found"
            }
        )

    }

    const reviewCheck = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    })

    if (reviewCheck) {
        return res.status(500).json(
            {
                "message": "User already has a review for this spot"
            }
        )
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

router.get('/:spotId/bookings', async (req, res) => {

    const spot = req.params.spotId

    const checkSpot = await Spot.findByPk(spot)

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

    console.log(bookings)
    res.status(200).json({ Bookings: bookings })
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spgitotId/bookings', requireAuth, validateBooking, async (req, res, next) => {

    const { startDate, endDate } = req.body

    if (startDate > endDate) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const spotId = req.params.spotId

    const spotCheck = await Spot.findByPk(spotId)

    if (!spotCheck) {
        return res.status(404).json(
            {
                "message": "Spot couldn't be found"
            }
        )

    }

    // const bookingCheck = await Booking.findAll({

    //     where: {
    //         spotId: spotId,
    //         startDate: startDate,
    //         endDate: endDate
    //     }

    // })

    // if (bookingCheck.length) {
    //     return res.status(403).json(
    //         {
    //             "message": "Sorry, this spot is already booked for the specified dates",
    //             "errors": {
    //               "startDate": "Start date conflicts with an existing booking",
    //               "endDate": "End date conflicts with an existing booking"
    //             }
    //           }
    //     )
    // }

    try {
        const spot = await Booking.create({
            spotId: spotId,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate
        })

        return res.json(spot)

    } catch (error) {
        next(error)
    }
})










module.exports = router;
