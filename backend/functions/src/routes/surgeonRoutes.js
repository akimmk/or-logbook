const express = require('express');
const router = express.Router();
const SurgeonController = require('../controllers/surgeonController');
const { verifyToken, requireAdmin, requireSurgeonOrAdmin } = require('../middlewares/verifyToken');

// All surgeon routes require authentication
router.use(verifyToken);

// Surgeon CRUD operations
router.post('/', requireAdmin, SurgeonController.createSurgeon);
router.get('/', SurgeonController.getAllSurgeons);
router.get('/my-profile', requireSurgeonOrAdmin, SurgeonController.getMyProfile);
router.put('/my-profile', requireSurgeonOrAdmin, SurgeonController.updateMyProfile);
router.get('/:id', SurgeonController.getSurgeon);
router.get('/user/:userId', SurgeonController.getSurgeonByUserId);
router.put('/:id', requireAdmin, SurgeonController.updateSurgeon);

// Surgeon-specific operations
router.get('/:id/patients', requireSurgeonOrAdmin, SurgeonController.getSurgeonPatients);
router.get('/:id/upcoming-operations', requireSurgeonOrAdmin, SurgeonController.getUpcomingOperations);
router.get('/:id/stats', requireSurgeonOrAdmin, SurgeonController.getSurgeonStats);

module.exports = router;
