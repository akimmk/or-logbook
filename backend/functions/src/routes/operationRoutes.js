const express = require('express');
const router = express.Router();
const OperationController = require('../controllers/operationController');
const { verifyToken, requireNurse, requireAdmin, requireSurgeonOrAdmin } = require('../middlewares/verifyToken');

// All operation routes require authentication
router.use(verifyToken);

// Operation CRUD operations
router.post('/', requireNurse, OperationController.createOperation);
router.get('/', OperationController.getOperations);
router.get('/my-operations', OperationController.getMyOperations);
router.get('/today', OperationController.getTodaysOperations);
router.get('/date-range', OperationController.getOperationsByDateRange);
router.get('/stats', OperationController.getOperationStats);
router.get('/:id', OperationController.getOperation);
router.put('/:id', requireAdmin, OperationController.updateOperation);
router.put('/:id/status', requireSurgeonOrAdmin, OperationController.updateOperationStatus);
router.delete('/:id', requireAdmin, OperationController.deleteOperation);

module.exports = router;
