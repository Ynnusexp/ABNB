const sequelize = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); //
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.delete('/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params
    const img = await ReviewImage.findByPk(imageId)

    if (!img) {
        return res.status(404).json(
            {
                "message": "Review Image couldn't be found"

              })

    }

    await img.destroy()

    return res.status(200).json({

        "message": "Successfully deleted"

    })

})






















module.exports = router;
