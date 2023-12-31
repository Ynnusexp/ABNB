const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router()


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({

        where: {

            userId: req.user.id

        },

        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
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
            }, {

                model: ReviewImage,
                attributes: ['id', 'url']

            }
        ]
    })

 reviews.forEach(review => {
    const spot = review.Spot
    spot.lat = parseFloat(spot.lat);
    spot.lng = parseFloat(spot.lng);
    spot.price = parseFloat(spot.price);
 });

   return res.status(200).json({

         Reviews: reviews

         })
})

//Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', requireAuth, async (req, res) => {

    const reviews = await Review.findByPk(req.params.reviewId)


    if (!reviews) {

        return res.status(404).json({

            message: "Review couldn't be found"

        })
    }

    if (reviews.userId !== req.user.id) {

        return res.status(403).json({ 

            message: "Forbidden"

        })

    }

    const spot = await Spot.findByPk(reviews.spotId)

    const { url, preview } = req.body

    const reviewImg = await ReviewImage.findAll({

        where: {

            reviewId: reviews.id

        }

    })

    if (preview === true) spot.previewImage = url

    if (reviewImg.length > 9) {

        return res.status(403).json({

            message: "Maximum number of images for this resource was reached"

         })

    } else {

        let newReview = await reviews.createReviewImage({

            url, reviewId: req.params.reviewId

        })

        const returnObj = {

            id: newReview.id,
            url: newReview.url

        }

        return res.status(200).json(returnObj)
    }
})

//Edit a Review

router.put('/:reviewId', requireAuth, async (req, res) => {

    const reviews = await Review.findByPk(req.params.reviewId)

    const { user } = req

    if (!reviews) {

        return res.status(404).json({

            message: "Review couldn't be found"

        })
    }

    if (reviews.userId !== user.id) {

       return res.status(403).json({

            message: "Forbidden"

        })

    }

    const { review, stars } = req.body

    let errors = []

    if (!req.body.review){

        errors.push("Review text is required")

    }

    if (req.body.stars > 5 || req.body.stars < 1 || !stars){

        errors.push("Stars must be an integer from 1 to 5")

    }

    if (errors.length > 0) {

        return res.status(400).json({

            message: "Bad Request", errors: {

                review: errors[0],
                stars: errors[1]

            }
        })
    }

    reviews.review = review

    reviews.stars = stars

    await reviews.save()

    return res.status(200).json(reviews)
})

//Delete a Review

router.delete('/:reviewId', requireAuth, async (req, res) => {

    let review = await Review.findByPk(req.params.reviewId)

    const { user } = req

    if (!review) {

        return res.status(404).json({

            message: "Review couldn't be found"

        })
    }

    if (review.userId !== user.id) {

        return res.status(403).json({

            message: "Forbidden"

        })

    }
    await review.destroy()

    return res.status(200).json({

    message: "Successfully deleted"

    })
})

module.exports = router
