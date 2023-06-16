const express = require('express');
const router = express.Router();
const rabbitMQController = require('../controllers/messageController');

router.post('/publish', rabbitMQController.publishMessage);
router.get('/subscribe/:queueName', rabbitMQController.subscribeToQueue);

module.exports = router;