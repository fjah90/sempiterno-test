const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

module.exports = router;