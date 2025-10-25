const PatientService = require('../services/patientService');

class PatientController {
  /**
   * Create a new patient
   */
  static async createPatient(req, res) {
    try {
      const patientData = req.body;

      // Add nurse ID who created the patient
      patientData.createdBy = req.user.uid;

      const result = await PatientService.createPatient(patientData);

      res.status(201).json({
        success: true,
        message: 'Patient created successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Create patient error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get patient by ID
   */
  static async getPatient(req, res) {
    try {
      const { id } = req.params;

      const result = await PatientService.getPatientById(id);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get patient error:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get all patients with pagination and search
   */
  static async getAllPatients(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = '' 
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

      const result = await PatientService.getAllPatients(pageNum, limitNum, search);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get all patients error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update patient
   */
  static async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Add updated by information
      updateData.updatedBy = req.user.uid;

      const result = await PatientService.updatePatient(id, updateData);

      res.json({
        success: true,
        message: 'Patient updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update patient error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Delete patient
   */
  static async deletePatient(req, res) {
    try {
      const { id } = req.params;

      const result = await PatientService.deletePatient(id);

      res.json({
        success: true,
        message: 'Patient deleted successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Delete patient error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Search patients
   */
  static async searchPatients(req, res) {
    try {
      const { q, limit = 10 } = req.query;

      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const limitNum = parseInt(limit);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be between 1 and 50'
        });
      }

      const result = await PatientService.searchPatients(q.trim(), limitNum);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Search patients error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get patient statistics
   */
  static async getPatientStats(req, res) {
    try {
      // This would require implementing getPatientStats in PatientService
      // For now, return a placeholder
      res.json({
        success: true,
        message: 'Patient statistics endpoint - to be implemented',
        data: {
          totalPatients: 0,
          newPatientsThisMonth: 0,
          patientsByAgeGroup: {},
          patientsByDepartment: {}
        }
      });
    } catch (error) {
      console.error('Get patient stats error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = PatientController;
