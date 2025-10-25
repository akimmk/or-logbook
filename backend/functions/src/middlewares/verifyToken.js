const { auth } = require('../config/firebaseConfig');

/**
 * Middleware to verify Firebase ID token
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header missing or invalid'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user' // Custom claim for role
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to require specific role
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }
    
    next();
  };
};

/**
 * Middleware to require admin role
 */
const requireAdmin = requireRole('admin');

/**
 * Middleware to require nurse role
 */
const requireNurse = requireRole('nurse');

/**
 * Middleware to require surgeon role
 */
const requireSurgeon = requireRole('surgeon');

/**
 * Middleware to require nurse or admin role
 */
const requireNurseOrAdmin = requireRole(['nurse', 'admin']);

/**
 * Middleware to require surgeon or admin role
 */
const requireSurgeonOrAdmin = requireRole(['surgeon', 'admin']);

module.exports = {
  verifyToken,
  requireRole,
  requireAdmin,
  requireNurse,
  requireSurgeon,
  requireNurseOrAdmin,
  requireSurgeonOrAdmin
};
