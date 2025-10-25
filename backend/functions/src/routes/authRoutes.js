const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken, requireAdmin } = require('../middlewares/verifyToken');

// Public routes
router.post('/register', AuthController.register);

// Protected routes
router.get('/profile', verifyToken, AuthController.getProfile);

// Admin only routes
router.put('/users/:userId/role', verifyToken, requireAdmin, AuthController.updateUserRole);
router.delete('/users/:userId', verifyToken, requireAdmin, AuthController.deleteUser);
router.get('/users', verifyToken, requireAdmin, AuthController.getAllUsers);

module.exports = router;
