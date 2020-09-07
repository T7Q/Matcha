const express = require('express');
const router = express.Router();

// @route   GET api/messages
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('Message route');
})

module.exports = router;
