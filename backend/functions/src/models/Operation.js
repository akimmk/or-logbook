/**
 * Operation Model
 * Represents an operation log entry in the system
 */

class Operation {
  constructor(data) {
    this.id = data.id;
    this.patientId = data.patientId;
    this.surgeonId = data.surgeonId;
    this.nurseId = data.nurseId; // Who created the log
    this.operationType = data.operationType;
    this.operationDate = data.operationDate;
    this.scheduledStartTime = data.scheduledStartTime;
    this.actualStartTime = data.actualStartTime;
    this.actualEndTime = data.actualEndTime;
    this.operatingRoom = data.operatingRoom;
    this.anesthesiaType = data.anesthesiaType;
    this.anesthesiologist = data.anesthesiologist;
    this.assistantSurgeons = data.assistantSurgeons || [];
    this.complications = data.complications;
    this.outcomes = data.outcomes;
    this.notes = data.notes;
    this.status = data.status || 'scheduled'; // scheduled, in-progress, completed, cancelled
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validation methods
  static validate(data) {
    const errors = [];

    if (!data.patientId || data.patientId.trim().length === 0) {
      errors.push('Patient ID is required');
    }

    if (!data.surgeonId || data.surgeonId.trim().length === 0) {
      errors.push('Surgeon ID is required');
    }

    if (!data.nurseId || data.nurseId.trim().length === 0) {
      errors.push('Nurse ID is required');
    }

    if (!data.operationType || data.operationType.trim().length === 0) {
      errors.push('Operation type is required');
    }

    if (!data.operationDate || !this.isValidDate(data.operationDate)) {
      errors.push('Valid operation date is required');
    }

    if (data.scheduledStartTime && !this.isValidTime(data.scheduledStartTime)) {
      errors.push('Valid scheduled start time is required');
    }

    if (data.actualStartTime && !this.isValidTime(data.actualStartTime)) {
      errors.push('Valid actual start time is required');
    }

    if (data.actualEndTime && !this.isValidTime(data.actualEndTime)) {
      errors.push('Valid actual end time is required');
    }

    if (data.status && !['scheduled', 'in-progress', 'completed', 'cancelled'].includes(data.status)) {
      errors.push('Status must be scheduled, in-progress, completed, or cancelled');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static isValidTime(time) {
    return time instanceof Date && !isNaN(time.getTime());
  }

  // Calculate operation duration
  getDuration() {
    if (!this.actualStartTime || !this.actualEndTime) {
      return null;
    }
    
    const start = new Date(this.actualStartTime);
    const end = new Date(this.actualEndTime);
    const durationMs = end.getTime() - start.getTime();
    
    if (durationMs < 0) return null;
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes, totalMinutes: Math.floor(durationMs / (1000 * 60)) };
  }

  // Check if operation is overdue
  isOverdue() {
    if (this.status === 'completed' || this.status === 'cancelled') {
      return false;
    }
    
    const now = new Date();
    const scheduledTime = new Date(this.operationDate);
    
    if (this.scheduledStartTime) {
      scheduledTime.setHours(
        this.scheduledStartTime.getHours(),
        this.scheduledStartTime.getMinutes(),
        this.scheduledStartTime.getSeconds()
      );
    }
    
    return now > scheduledTime;
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      patientId: this.patientId,
      surgeonId: this.surgeonId,
      nurseId: this.nurseId,
      operationType: this.operationType,
      operationDate: this.operationDate,
      scheduledStartTime: this.scheduledStartTime,
      actualStartTime: this.actualStartTime,
      actualEndTime: this.actualEndTime,
      operatingRoom: this.operatingRoom,
      anesthesiaType: this.anesthesiaType,
      anesthesiologist: this.anesthesiologist,
      assistantSurgeons: this.assistantSurgeons,
      complications: this.complications,
      outcomes: this.outcomes,
      notes: this.notes,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();
    return new Operation({
      id: doc.id,
      patientId: data.patientId,
      surgeonId: data.surgeonId,
      nurseId: data.nurseId,
      operationType: data.operationType,
      operationDate: data.operationDate?.toDate(),
      scheduledStartTime: data.scheduledStartTime?.toDate(),
      actualStartTime: data.actualStartTime?.toDate(),
      actualEndTime: data.actualEndTime?.toDate(),
      operatingRoom: data.operatingRoom,
      anesthesiaType: data.anesthesiaType,
      anesthesiologist: data.anesthesiologist,
      assistantSurgeons: data.assistantSurgeons || [],
      complications: data.complications,
      outcomes: data.outcomes,
      notes: data.notes,
      status: data.status,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate()
    });
  }
}

module.exports = Operation;
