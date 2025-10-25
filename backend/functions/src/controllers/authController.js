const AuthService = require('../services/authService');

class AuthController {
  /**
   * Register a new user
   */
  static async register(req, res) {
    try {
      const { email, password, role, ...additionalData } = req.body;

      // Validate required fields
      if (!email || !password || !role) {
        return res.status(400).json({
          success: false,
          error: 'Email, password, and role are required'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      // Validate password strength
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters long'
        });
      }

      // Validate role
      if (!['nurse', 'surgeon', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          error: 'Role must be nurse, surgeon, or admin'
        });
      }

      // Validate additional data based on role
      if (role === 'nurse' || role === 'surgeon') {
        if (!additionalData.firstName || !additionalData.lastName) {
          return res.status(400).json({
            success: false,
            error: 'First name and last name are required for nurses and surgeons'
          });
        }
      }

      const result = await AuthService.createUser(email, password, role, additionalData);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get user profile
   */
  static async getProfile(req, res) {
    try {
      const { uid } = req.user;

      const result = await AuthService.getUserProfile(uid);

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update user role (admin only)
   */
  static async updateUserRole(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!role || !['nurse', 'surgeon', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          error: 'Valid role is required'
        });
      }

      const result = await AuthService.updateUserRole(userId, role);

      res.json({
        success: true,
        message: 'User role updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Delete user (admin only)
   */
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      const result = await AuthService.deleteUser(userId);

      res.json({
        success: true,
        message: 'User deleted successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, role } = req.query;

      // This would require implementing getAllUsers in AuthService
      // For now, return a placeholder
      res.json({
        success: true,
        message: 'Get all users endpoint - to be implemented',
        data: []
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = AuthController;
