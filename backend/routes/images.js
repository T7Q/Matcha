const express = require('express');
const router = express.Router();

// @route   GET api/images
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('Image route');
})

module.exports = router;
