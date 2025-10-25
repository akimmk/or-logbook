const { db } = require('../config/firebaseConfig');
const Surgeon = require('../models/Surgeon');
const Patient = require('../models/Patient');
const Operation = require('../models/Operation');

class SurgeonService {
  /**
   * Create a new surgeon
   */
  static async createSurgeon(surgeonData) {
    try {
      // Validate surgeon data
      const validation = Surgeon.validate(surgeonData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Check if user exists
      const userDoc = await db.collection('users').doc(surgeonData.userId).get();
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      // Check if surgeon profile already exists for this user
      const existingSurgeon = await db.collection('surgeons')
        .where('userId', '==', surgeonData.userId)
        .limit(1)
        .get();

      if (!existingSurgeon.empty) {
        throw new Error('Surgeon profile already exists for this user');
      }

      // Create surgeon
      const surgeon = new Surgeon({
        ...surgeonData,
        createdAt: new Date()
      });

      const docRef = await db.collection('surgeons').add(surgeon.toFirestore());

      return {
        success: true,
        data: {
          id: docRef.id,
          ...surgeon.toFirestore()
        }
      };
    } catch (error) {
      console.error('Error creating surgeon:', error);
      throw new Error(`Failed to create surgeon: ${error.message}`);
    }
  }

  /**
   * Get surgeon by ID
   */
  static async getSurgeonById(surgeonId) {
    try {
      const surgeonDoc = await db.collection('surgeons').doc(surgeonId).get();
      
      if (!surgeonDoc.exists) {
        throw new Error('Surgeon not found');
      }

      return {
        success: true,
        data: Surgeon.fromFirestore(surgeonDoc)
      };
    } catch (error) {
      console.error('Error getting surgeon:', error);
      throw new Error(`Failed to get surgeon: ${error.message}`);
    }
  }

  /**
   * Get surgeon by user ID
   */
  static async getSurgeonByUserId(userId) {
    try {
      const surgeonQuery = await db.collection('surgeons')
        .where('userId', '==', userId)
        .limit(1)
        .get();

      if (surgeonQuery.empty) {
        throw new Error('Surgeon not found');
      }

      const surgeonDoc = surgeonQuery.docs[0];
      return {
        success: true,
        data: Surgeon.fromFirestore(surgeonDoc)
      };
    } catch (error) {
      console.error('Error getting surgeon by user ID:', error);
      throw new Error(`Failed to get surgeon: ${error.message}`);
    }
  }

  /**
   * Get all surgeons
   */
  static async getAllSurgeons(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const snapshot = await db.collection('surgeons')
        .orderBy('createdAt', 'desc')
        .offset(offset)
        .limit(limit)
        .get();

      const surgeons = [];
      snapshot.forEach(doc => {
        surgeons.push(Surgeon.fromFirestore(doc));
      });

      // Get total count for pagination
      const totalSnapshot = await db.collection('surgeons').get();
      const total = totalSnapshot.size;

      return {
        success: true,
        data: {
          surgeons,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      console.error('Error getting surgeons:', error);
      throw new Error(`Failed to get surgeons: ${error.message}`);
    }
  }

  /**
   * Update surgeon
   */
  static async updateSurgeon(surgeonId, updateData) {
    try {
      // Check if surgeon exists
      const surgeonDoc = await db.collection('surgeons').doc(surgeonId).get();
      if (!surgeonDoc.exists) {
        throw new Error('Surgeon not found');
      }

      // Validate update data
      const validation = Surgeon.validate(updateData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Update surgeon
      await db.collection('surgeons').doc(surgeonId).update(updateData);

      // Get updated surgeon
      const updatedSurgeonDoc = await db.collection('surgeons').doc(surgeonId).get();
      const updatedSurgeon = Surgeon.fromFirestore(updatedSurgeonDoc);

      return {
        success: true,
        data: updatedSurgeon
      };
    } catch (error) {
      console.error('Error updating surgeon:', error);
      throw new Error(`Failed to update surgeon: ${error.message}`);
    }
  }

  /**
   * Get patients assigned to a surgeon
   */
  static async getSurgeonPatients(surgeonId, page = 1, limit = 10) {
    try {
      // Get operations for this surgeon
      const offset = (page - 1) * limit;
      const operationsQuery = await db.collection('operations')
        .where('surgeonId', '==', surgeonId)
        .orderBy('operationDate', 'desc')
        .offset(offset)
        .limit(limit)
        .get();

      const operations = [];
      const patientIds = new Set();

      // Collect operation data and unique patient IDs
      for (const doc of operationsQuery.docs) {
        const operation = Operation.fromFirestore(doc);
        operations.push(operation);
        patientIds.add(operation.patientId);
      }

      // Get patient details for all unique patients
      const patients = [];
      for (const patientId of patientIds) {
        try {
          const patientDoc = await db.collection('patients').doc(patientId).get();
          if (patientDoc.exists) {
            patients.push(Patient.fromFirestore(patientDoc));
          }
        } catch (error) {
          console.warn(`Failed to fetch patient ${patientId}:`, error);
        }
      }

      // Get total count for pagination
      const totalOperationsQuery = await db.collection('operations')
        .where('surgeonId', '==', surgeonId)
        .get();
      const total = totalOperationsQuery.size;

      return {
        success: true,
        data: {
          operations,
          patients,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      console.error('Error getting surgeon patients:', error);
      throw new Error(`Failed to get surgeon patients: ${error.message}`);
    }
  }

  /**
   * Get surgeon's upcoming operations
   */
  static async getUpcomingOperations(surgeonId, limit = 10) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const operationsQuery = await db.collection('operations')
        .where('surgeonId', '==', surgeonId)
        .where('operationDate', '>=', today)
        .where('status', 'in', ['scheduled', 'in-progress'])
        .orderBy('operationDate', 'asc')
        .orderBy('scheduledStartTime', 'asc')
        .limit(limit)
        .get();

      const operations = [];
      for (const doc of operationsQuery.docs) {
        const operation = Operation.fromFirestore(doc);
        
        // Get patient details
        try {
          const patientDoc = await db.collection('patients').doc(operation.patientId).get();
          if (patientDoc.exists) {
            operation.patient = Patient.fromFirestore(patientDoc);
          }
        } catch (error) {
          console.warn(`Failed to fetch patient for operation ${operation.id}:`, error);
        }

        operations.push(operation);
      }

      return {
        success: true,
        data: operations
      };
    } catch (error) {
      console.error('Error getting upcoming operations:', error);
      throw new Error(`Failed to get upcoming operations: ${error.message}`);
    }
  }

  /**
   * Get surgeon's operation statistics
   */
  static async getSurgeonStats(surgeonId, startDate, endDate) {
    try {
      let query = db.collection('operations').where('surgeonId', '==', surgeonId);

      if (startDate) {
        query = query.where('operationDate', '>=', startDate);
      }
      if (endDate) {
        query = query.where('operationDate', '<=', endDate);
      }

      const snapshot = await query.get();
      
      const stats = {
        totalOperations: 0,
        completedOperations: 0,
        cancelledOperations: 0,
        inProgressOperations: 0,
        scheduledOperations: 0,
        totalDuration: 0,
        averageDuration: 0
      };

      let totalDurationMinutes = 0;
      let completedCount = 0;

      snapshot.forEach(doc => {
        const operation = Operation.fromFirestore(doc);
        stats.totalOperations++;

        switch (operation.status) {
          case 'completed':
            stats.completedOperations++;
            if (operation.actualStartTime && operation.actualEndTime) {
              const duration = operation.getDuration();
              if (duration) {
                totalDurationMinutes += duration.totalMinutes;
                completedCount++;
              }
            }
            break;
          case 'cancelled':
            stats.cancelledOperations++;
            break;
          case 'in-progress':
            stats.inProgressOperations++;
            break;
          case 'scheduled':
            stats.scheduledOperations++;
            break;
        }
      });

      if (completedCount > 0) {
        stats.averageDuration = Math.round(totalDurationMinutes / completedCount);
        stats.totalDuration = totalDurationMinutes;
      }

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error getting surgeon stats:', error);
      throw new Error(`Failed to get surgeon stats: ${error.message}`);
    }
  }
}

module.exports = SurgeonService;
