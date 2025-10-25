/**
 * User Model
 * Represents a user in the system with role-based access
 */

class User {
  constructor(data) {
    this.uid = data.uid;
    this.email = data.email;
    this.role = data.role; // 'nurse', 'surgeon', 'admin'
    this.createdAt = data.createdAt || new Date();
  }

  // Validation methods
  static validate(data) {
    const errors = [];

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.role || !['nurse', 'surgeon', 'admin'].includes(data.role)) {
      errors.push('Role must be nurse, surgeon, or admin');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      uid: this.uid,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    };
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();
    return new User({
      uid: doc.id,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt?.toDate()
    });
  }
}

module.exports = User;
