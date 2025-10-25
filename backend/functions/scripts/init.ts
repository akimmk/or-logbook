/**
 * Database Initialization Script
 * Creates initial admin user and seeds sample data for testing
 */

import * as admin from 'firebase-admin';
import { AuthService } from '../src/services/authService';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

interface SeedData {
  adminUser: {
    email: string;
    password: string;
  };
  nurses: Array<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    licenseNumber: string;
    contact: string;
  }>;
  surgeons: Array<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    specialization: string;
    licenseNumber: string;
    contact: string;
  }>;
  patients: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    medicalRecordNumber: string;
    contact: string;
    admissionDate: Date;
  }>;
  operations: Array<{
    patientId: string;
    surgeonId: string;
    nurseId: string;
    operationType: string;
    operationDate: Date;
    scheduledStartTime: Date;
    actualStartTime?: Date;
    actualEndTime?: Date;
    operatingRoom: string;
    anesthesiaType: string;
    anesthesiologist: string;
    assistantSurgeons: string[];
    complications?: string;
    outcomes?: string;
    notes?: string;
    status: string;
  }>;
}

const seedData: SeedData = {
  adminUser: {
    email: 'admin@orlogbook.com',
    password: 'Admin123!'
  },
  nurses: [
    {
      email: 'nurse1@orlogbook.com',
      password: 'Nurse123!',
      firstName: 'Sarah',
      lastName: 'Johnson',
      department: 'Operating Room',
      licenseNumber: 'RN-001234',
      contact: '+1234567890'
    },
    {
      email: 'nurse2@orlogbook.com',
      password: 'Nurse123!',
      firstName: 'Michael',
      lastName: 'Brown',
      department: 'Recovery Room',
      licenseNumber: 'RN-001235',
      contact: '+1234567891'
    }
  ],
  surgeons: [
    {
      email: 'surgeon1@orlogbook.com',
      password: 'Surgeon123!',
      firstName: 'Dr. Emily',
      lastName: 'Davis',
      specialization: 'Cardiovascular Surgery',
      licenseNumber: 'MD-001234',
      contact: '+1234567892'
    },
    {
      email: 'surgeon2@orlogbook.com',
      password: 'Surgeon123!',
      firstName: 'Dr. James',
      lastName: 'Wilson',
      specialization: 'Orthopedic Surgery',
      licenseNumber: 'MD-001235',
      contact: '+1234567893'
    }
  ],
  patients: [
    {
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: new Date('1980-05-15'),
      medicalRecordNumber: 'MRN-001',
      contact: '+1234567894',
      admissionDate: new Date('2024-01-15')
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date('1975-08-22'),
      medicalRecordNumber: 'MRN-002',
      contact: '+1234567895',
      admissionDate: new Date('2024-01-16')
    },
    {
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: new Date('1990-12-03'),
      medicalRecordNumber: 'MRN-003',
      contact: '+1234567896',
      admissionDate: new Date('2024-01-17')
    }
  ],
  operations: [
    {
      patientId: '', // Will be filled after patients are created
      surgeonId: '', // Will be filled after surgeons are created
      nurseId: '', // Will be filled after nurses are created
      operationType: 'Coronary Artery Bypass Graft',
      operationDate: new Date('2024-01-20'),
      scheduledStartTime: new Date('2024-01-20T08:00:00'),
      actualStartTime: new Date('2024-01-20T08:15:00'),
      actualEndTime: new Date('2024-01-20T12:30:00'),
      operatingRoom: 'OR-1',
      anesthesiaType: 'General',
      anesthesiologist: 'Dr. Anesthesia Smith',
      assistantSurgeons: ['Dr. Assistant Johnson'],
      complications: 'None',
      outcomes: 'Successful',
      notes: 'Patient stable throughout procedure',
      status: 'completed'
    },
    {
      patientId: '', // Will be filled after patients are created
      surgeonId: '', // Will be filled after surgeons are created
      nurseId: '', // Will be filled after nurses are created
      operationType: 'Knee Arthroscopy',
      operationDate: new Date('2024-01-21'),
      scheduledStartTime: new Date('2024-01-21T10:00:00'),
      operatingRoom: 'OR-2',
      anesthesiaType: 'Regional',
      anesthesiologist: 'Dr. Anesthesia Brown',
      assistantSurgeons: [],
      status: 'scheduled'
    }
  ]
};

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...');

  try {
    // Step 1: Create admin user
    console.log('📝 Creating admin user...');
    const adminResult = await AuthService.createUser(
      seedData.adminUser.email,
      seedData.adminUser.password,
      'admin'
    );
    console.log('✅ Admin user created:', adminResult.data.email);

    // Step 2: Create nurses
    console.log('👩‍⚕️ Creating nurses...');
    const nurseIds: string[] = [];
    for (const nurseData of seedData.nurses) {
      const nurseResult = await AuthService.createUser(
        nurseData.email,
        nurseData.password,
        'nurse',
        {
          firstName: nurseData.firstName,
          lastName: nurseData.lastName,
          department: nurseData.department,
          licenseNumber: nurseData.licenseNumber,
          contact: nurseData.contact
        }
      );
      nurseIds.push(nurseResult.data.uid);
      console.log('✅ Nurse created:', nurseResult.data.email);
    }

    // Step 3: Create surgeons
    console.log('👨‍⚕️ Creating surgeons...');
    const surgeonIds: string[] = [];
    for (const surgeonData of seedData.surgeons) {
      const surgeonResult = await AuthService.createUser(
        surgeonData.email,
        surgeonData.password,
        'surgeon',
        {
          firstName: surgeonData.firstName,
          lastName: surgeonData.lastName,
          specialization: surgeonData.specialization,
          licenseNumber: surgeonData.licenseNumber,
          contact: surgeonData.contact
        }
      );
      surgeonIds.push(surgeonResult.data.uid);
      console.log('✅ Surgeon created:', surgeonResult.data.email);
    }

    // Step 4: Create patients
    console.log('🏥 Creating patients...');
    const patientIds: string[] = [];
    for (const patientData of seedData.patients) {
      const patientDoc = await db.collection('patients').add({
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dateOfBirth: patientData.dateOfBirth,
        medicalRecordNumber: patientData.medicalRecordNumber,
        contact: patientData.contact,
        admissionDate: patientData.admissionDate,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      patientIds.push(patientDoc.id);
      console.log('✅ Patient created:', `${patientData.firstName} ${patientData.lastName}`);
    }

    // Step 5: Create operations
    console.log('⚕️ Creating operations...');
    for (let i = 0; i < seedData.operations.length; i++) {
      const operationData = seedData.operations[i];
      const operationDoc = await db.collection('operations').add({
        patientId: patientIds[i % patientIds.length],
        surgeonId: surgeonIds[i % surgeonIds.length],
        nurseId: nurseIds[i % nurseIds.length],
        operationType: operationData.operationType,
        operationDate: operationData.operationDate,
        scheduledStartTime: operationData.scheduledStartTime,
        actualStartTime: operationData.actualStartTime,
        actualEndTime: operationData.actualEndTime,
        operatingRoom: operationData.operatingRoom,
        anesthesiaType: operationData.anesthesiaType,
        anesthesiologist: operationData.anesthesiologist,
        assistantSurgeons: operationData.assistantSurgeons,
        complications: operationData.complications,
        outcomes: operationData.outcomes,
        notes: operationData.notes,
        status: operationData.status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Operation created:', operationData.operationType);
    }

    console.log('🎉 Database initialization completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Admin user: ${seedData.adminUser.email}`);
    console.log(`- Nurses: ${nurseIds.length}`);
    console.log(`- Surgeons: ${surgeonIds.length}`);
    console.log(`- Patients: ${patientIds.length}`);
    console.log(`- Operations: ${seedData.operations.length}`);

    console.log('\n🔑 Login credentials:');
    console.log(`Admin: ${seedData.adminUser.email} / ${seedData.adminUser.password}`);
    console.log(`Nurse 1: ${seedData.nurses[0].email} / ${seedData.nurses[0].password}`);
    console.log(`Surgeon 1: ${seedData.surgeons[0].email} / ${seedData.surgeons[0].password}`);

  } catch (error) {
    console.error('❌ Error during initialization:', error);
    throw error;
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Initialization failed:', error);
      process.exit(1);
    });
}

export { initializeDatabase };
