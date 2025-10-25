/**
 * Surgeon Model
 * Represents a surgeon in the system
 */

class Surgeon {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId; // Reference to users collection
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.specialization = data.specialization;
    this.licenseNumber = data.licenseNumber;
    this.contact = data.contact;
    this.createdAt = data.createdAt || new Date();
  }

  // Validation methods
  static validate(data) {
    const errors = [];

    if (!data.firstName || data.firstName.trim().length === 0) {
      errors.push('First name is required');
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    if (!data.specialization || data.specialization.trim().length === 0) {
      errors.push('Specialization is required');
    }

    if (!data.licenseNumber || data.licenseNumber.trim().length === 0) {
      errors.push('License number is required');
    }

    if (data.contact && !this.isValidPhone(data.contact)) {
      errors.push('Valid contact number is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      specialization: this.specialization,
      licenseNumber: this.licenseNumber,
      contact: this.contact,
      createdAt: this.createdAt
    };
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();
    return new Surgeon({
      id: doc.id,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      specialization: data.specialization,
      licenseNumber: data.licenseNumber,
      contact: data.contact,
      createdAt: data.createdAt?.toDate()
    });
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = Surgeon;
