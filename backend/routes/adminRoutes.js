const express = require('express');
const router = express.Router();
const { loginAdmin, logoutAdmin, getCurrentAdmin } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);
router.get('/me', getCurrentAdmin); // Add this line

module.exports = router;