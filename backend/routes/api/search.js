const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { User, Song, Comment } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
    const { search } = req.body;
    const searchResultsUser = await User.findAll({
        where: {
            username: {
                [Op.substring]: search
            }
        }
    })
    const searchResultsSong = await Song.findAll({
        where: {
            title: {
                [Op.substring]: search
            }
        }
    })

    return res.json(searchResultsUser, searchResultsSong);
}))

module.exports = router;
