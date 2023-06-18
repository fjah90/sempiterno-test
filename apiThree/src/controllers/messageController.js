const MessageService = require('../services/messageServices');

const rabbitMQService = new MessageService();

const messageController = {};

messageController.publishMessage = async (req, res) => {
  const { queueName, message } = req.body;

  try {
    await rabbitMQService.publish(queueName, message);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

messageController.subscribeToQueue = async (req, res) => {
  const { queueName } = req.params;

  try {
    await rabbitMQService.subscribe(queueName, (message) => {
      console.log(`Received message from ${queueName}: ${message}`);
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = messageController;