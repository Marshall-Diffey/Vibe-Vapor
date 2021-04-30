const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '',
    // may need to invoke singleMulterUpload twice instead of passing two arguments
    singleMulterUpload('profilePicture', 'headerPicture'),
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      let headerPictureUrl;
      let profilePictureUrl;
      if (req.file.length) {
        req.file.forEach(async (pic) => {
          if (pic.slice(0, pic.length - 6) === 'header') {
            headerPictureUrl = await singlePublicFileUpload(pic.slice(0, pic.length - 6));
          }
          else {
            profilePictureUrl = await singlePublicFileUpload(pic);
          }
        })
      }
      const user = await User.signup({ email, username, password, headerPictureUrl, profilePictureUrl });
      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
);

router.get(
  '/:id',

);

router.get(
  '/profile',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    return res.json({
      user
    })
  })
);

module.exports = router;
