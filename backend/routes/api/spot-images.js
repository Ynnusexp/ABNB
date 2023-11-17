const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req

    const {imageId} = req.params

    const img = await SpotImage.findByPk(imageId, {

        include: {

            model: Spot, attributes: ["ownerId"]

        }

    })

    if (!img) {

        return res.status(404).json({

            "message": "Spot Image couldn't be found"

        })

    }

    if (img.Spot.ownerId !== user.id) {

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
