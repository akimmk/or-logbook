const OperationService = require('../services/operationService');

class OperationController {
  /**
   * Create a new operation (nurse only)
   */
  static async createOperation(req, res) {
    try {
      const operationData = req.body;

      // Add nurse ID who created the operation
      operationData.nurseId = req.user.uid;

      const result = await OperationService.createOperation(operationData);

      res.status(201).json({
        success: true,
        message: 'Operation created successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Create operation error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get operation by ID
   */
  static async getOperation(req, res) {
    try {
      const { id } = req.params;

      const result = await OperationService.getOperationById(id);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get operation error:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get all operations with filtering
   */
  static async getOperations(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10,
        patientId,
        surgeonId,
        nurseId,
        status,
        operatingRoom,
        startDate,
        endDate
      } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Invalid page number'
        });
      }

      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 100'
        });
      }

      // Build filters object
      const filters = {};
      if (patientId) filters.patientId = patientId;
      if (surgeonId) filters.surgeonId = surgeonId;
      if (nurseId) filters.nurseId = nurseId;
      if (status) filters.status = status;
      if (operatingRoom) filters.operatingRoom = operatingRoom;
      if (startDate) filters.startDate = new Date(startDate);
      if (endDate) filters.endDate = new Date(endDate);

      const result = await OperationService.getOperations(filters, pageNum, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get operations error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update operation (admin only)
   */
  static async updateOperation(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Add updated by information
      updateData.updatedBy = req.user.uid;

      const result = await OperationService.updateOperation(id, updateData);

      res.json({
        success: true,
        message: 'Operation updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update operation error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Delete operation (admin only)
   */
  static async deleteOperation(req, res) {
    try {
      const { id } = req.params;

      const result = await OperationService.deleteOperation(id);

      res.json({
        success: true,
        message: 'Operation deleted successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Delete operation error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get operations by date range
   */
  static async getOperationsByDateRange(req, res) {
    try {
      const { startDate, endDate, page = 1, limit = 10 } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'Start date and end date are required'
        });
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Invalid page number'
        });
      }

      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 100'
        });
      }

      const result = await OperationService.getOperationsByDateRange(
        startDate, 
        endDate, 
        pageNum, 
        limitNum
      );

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get operations by date range error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get today's operations
   */
  static async getTodaysOperations(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Invalid page number'
        });
      }

      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 100'
        });
      }

      const result = await OperationService.getTodaysOperations(pageNum, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get today\'s operations error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get operation statistics
   */
  static async getOperationStats(req, res) {
    try {
      const { startDate, endDate } = req.query;

      let start = null;
      let end = null;

      if (startDate) {
        start = new Date(startDate);
        if (isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            error: 'Invalid start date format'
          });
        }
      }

      if (endDate) {
        end = new Date(endDate);
        if (isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            error: 'Invalid end date format'
          });
        }
      }

      const result = await OperationService.getOperationStats(start, end);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get operation stats error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get operations for current user (surgeon or nurse)
   */
  static async getMyOperations(req, res) {
    try {
      const { role, uid } = req.user;
      const { page = 1, limit = 10, status } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          success: false,
          error: 'Invalid page number'
        });
      }

      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 100'
        });
      }

      // Build filters based on user role
      const filters = {};
      if (role === 'surgeon') {
        // For surgeons, we need to get their surgeon ID first
        const { db } = require('../config/firebaseConfig');
        const surgeonQuery = await db.collection('surgeons')
          .where('userId', '==', uid)
          .limit(1)
          .get();
        
        if (surgeonQuery.empty) {
          return res.status(404).json({
            success: false,
            error: 'Surgeon profile not found'
          });
        }
        
        filters.surgeonId = surgeonQuery.docs[0].id;
      } else if (role === 'nurse') {
        filters.nurseId = uid;
      }

      if (status) {
        filters.status = status;
      }

      const result = await OperationService.getOperations(filters, pageNum, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get my operations error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update operation status (for surgeons to update their operations)
   */
  static async updateOperationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, actualStartTime, actualEndTime, notes } = req.body;

      if (!status || !['scheduled', 'in-progress', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Valid status is required'
        });
      }

      const updateData = { status };
      if (actualStartTime) updateData.actualStartTime = new Date(actualStartTime);
      if (actualEndTime) updateData.actualEndTime = new Date(actualEndTime);
      if (notes) updateData.notes = notes;

      const result = await OperationService.updateOperation(id, updateData);

      res.json({
        success: true,
        message: 'Operation status updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update operation status error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = OperationController;
