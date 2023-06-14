const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/download-image', imageController.downloadImage);

module.exports = router;