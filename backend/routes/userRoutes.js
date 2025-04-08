const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authUser = require('../middleware/authUser');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/me', authUser, userController.getCurrentUser);

module.exports = router;