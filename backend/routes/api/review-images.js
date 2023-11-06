const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); //
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');



//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {

    const {imageId} = req.params

    const img = await ReviewImage.findByPk(imageId, {
        include: { model: Review, attributes: ["userId"]}
    })

    if (!img) {

        return res.status(404).json({

                "message": "Review Image couldn't be found"

              })

    }

    if (img.Review.userId !== req.user.id) {

        return res.status(403).json({

            message: "Forbidden"

        })
    }



    await img.destroy()

    return res.status(200).json({

        "message": "Successfully deleted"

    })

});

module.exports = router;
