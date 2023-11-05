const { Op } = require("sequelize");

const queryFilters = async (req, res, next) => {

    const info = {
        message: "Bad Request",
        errors: {},

    };

    const validateRange = (value, min, max, errorMessage) => {

        if (value && (value < min || value > max)) {
            info.errors[errorMessage] = errorMessage;
            return true;

        }

        return false;
    };

    let hasErrors = false;

    let {

        page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice

    } = req.query;

    if (page && page < 1) {

        info.errors.page = "Page must be greater than or equal to 1";

        hasErrors = true;
    }

    if (size && size < 1) {

        info.errors.size = "Size must be greater than or equal to 1";

        hasErrors = true;
    }

    hasErrors = validateRange(maxLat, -90, 90, "Maximum latitude is invalid") || hasErrors;
    hasErrors = validateRange(minLat, -90, 90, "Minimum latitude is invalid") || hasErrors;
    hasErrors = validateRange(maxLng, -180, 180, "Maximum longitude is invalid") || hasErrors;
    hasErrors = validateRange(minLng, -180, 180, "Minimum longitude is invalid") || hasErrors;

    if (minPrice && minPrice < 0) {

        info.errors.minPrice = "Minimum price must be greater than or equal to 0";
        hasErrors = true;

    }

    if (maxPrice && maxPrice < 0) {

        info.errors.maxPrice = "Maximum price must be greater than or equal to 0";
        hasErrors = true;

    }

    page = (page && !isNaN(page) && page <= 10) ? parseInt(page) : 1;

    size = (size && !isNaN(size) && size <= 20) ? parseInt(size) : 20;

    const limit = size;

    const offset = size * (page - 1);

    req.pagination = {

        limit,
        offset,
        size,
        page,
        where: {

            lat: {
                [Op.between]: [minLat || -180.1, maxLat || 180.1],
            },
            lng: {
                [Op.between]: [minLng || -180.1, maxLng || 180.1],
            },
            price: {
                [Op.between]: [minPrice || 0.01, maxPrice || 1000000.01],
            },

        },
    };

    if (hasErrors) {

        info.status = 400;
        next(info);

    } else {

        next();
        
    }
};

module.exports = queryFilters;
