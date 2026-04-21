const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { requireLogin, requireManager } = require('../middleware/authMiddleware');

// public routes
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me);

// manager only (create employee/user)
router.post(
    '/create-user',
    requireLogin,
    requireManager,
    authController.createUser
);

module.exports = router;