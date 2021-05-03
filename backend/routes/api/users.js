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
    multipleMulterUpload('images'),
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username, profilePicture, headerPicture } = req.body;
      let headerPictureUrl = null;
      let profilePictureUrl = null;
      if (req.files) {
        if (profilePicture && headerPicture) {
          profilePictureUrl = await singlePublicFileUpload(req.files[0])
          headerPictureUrl = await singlePublicFileUpload(req.files[1]);
        } else if (profilePicture) profilePictureUrl = await singlePublicFileUpload(req.files[0]);
        else headerPictureUrl = await singlePublicFileUpload(req.files[0])
      }
      console.log(headerPictureUrl);
      console.log(profilePictureUrl);
      const user = await User.signup({ email, username, password, profilePictureUrl, headerPictureUrl });
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
