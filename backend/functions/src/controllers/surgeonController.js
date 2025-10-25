const SurgeonService = require('../services/surgeonService');

class SurgeonController {
  /**
   * Create a new surgeon
   */
  static async createSurgeon(req, res) {
    try {
      const surgeonData = req.body;

      const result = await SurgeonService.createSurgeon(surgeonData);

      res.status(201).json({
        success: true,
        message: 'Surgeon created successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Create surgeon error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get surgeon by ID
   */
  static async getSurgeon(req, res) {
    try {
      const { id } = req.params;

      const result = await SurgeonService.getSurgeonById(id);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get surgeon error:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get surgeon by user ID
   */
  static async getSurgeonByUserId(req, res) {
    try {
      const { userId } = req.params;

      const result = await SurgeonService.getSurgeonByUserId(userId);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get surgeon by user ID error:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get all surgeons
   */
  static async getAllSurgeons(req, res) {
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

      const result = await SurgeonService.getAllSurgeons(pageNum, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get all surgeons error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update surgeon
   */
  static async updateSurgeon(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await SurgeonService.updateSurgeon(id, updateData);

      res.json({
        success: true,
        message: 'Surgeon updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update surgeon error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get patients assigned to a surgeon
   */
  static async getSurgeonPatients(req, res) {
    try {
      const { id } = req.params;
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

      const result = await SurgeonService.getSurgeonPatients(id, pageNum, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get surgeon patients error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get surgeon's upcoming operations
   */
  static async getUpcomingOperations(req, res) {
    try {
      const { id } = req.params;
      const { limit = 10 } = req.query;

      const limitNum = parseInt(limit);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 50'
        });
      }

      const result = await SurgeonService.getUpcomingOperations(id, limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get upcoming operations error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get surgeon's operation statistics
   */
  static async getSurgeonStats(req, res) {
    try {
      const { id } = req.params;
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

      const result = await SurgeonService.getSurgeonStats(id, start, end);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get surgeon stats error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get surgeon's profile (for current user)
   */
  static async getMyProfile(req, res) {
    try {
      const { uid } = req.user;

      const result = await SurgeonService.getSurgeonByUserId(uid);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get my profile error:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update surgeon's profile (for current user)
   */
  static async updateMyProfile(req, res) {
    try {
      const { uid } = req.user;
      const updateData = req.body;

      // Get surgeon ID from user ID
      const surgeonResult = await SurgeonService.getSurgeonByUserId(uid);
      const surgeonId = surgeonResult.data.id;

      const result = await SurgeonService.updateSurgeon(surgeonId, updateData);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update my profile error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = SurgeonController;
