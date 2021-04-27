const router = require('express').Router();
const asyncHandler = require('express-async-handler');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
