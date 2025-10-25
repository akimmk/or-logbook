# OR Logbook - Local Development & Testing Guide

## Prerequisites

### Required Software
- Node.js 20+ (updated in package.json)
- Firebase CLI: `npm install -g firebase-tools`
- Git

### Firebase Setup
1. **Login to Firebase:**
   ```bash
   firebase login
   ```

2. **Set your project:**
   ```bash
   firebase use or-logbook
   ```

3. **Verify project configuration:**
   ```bash
   firebase projects:list
   ```

---

## Local Development Setup

### 1. Install Dependencies
```bash
# From project root
cd backend/functions
npm install
```

### 2. Environment Configuration
The project uses Firebase emulators for local development. No additional environment variables are needed for basic functionality.

### 3. Start Firebase Emulators
```bash
# From backend directory
cd backend
firebase emulators:start --only functions,firestore
```

This will start:
- **Functions Emulator**: `http://localhost:5001`
- **Firestore Emulator**: `http://localhost:8080`
- **Emulator UI**: `http://localhost:4000`

### 4. Initialize Database with Sample Data
```bash
# In a new terminal, from backend/functions directory
cd backend/functions
npm run init-db
```

This creates:
- 1 Admin user
- 2 Nurses
- 2 Surgeons  
- 3 Patients
- 2 Operations

---

## API Testing

### Base URLs
- **Local**: `http://localhost:5001/or-logbook/us-central1/api`
- **Production**: `https://us-central1-or-logbook.cloudfunctions.net/api`

### Authentication Flow

#### Step 1: Get Firebase ID Token
You need a Firebase ID token to access protected endpoints. Here are the methods:

**Method A: Using Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Authentication → Users
3. Click on a user → Copy UID
4. Use Firebase Admin SDK to generate custom token

**Method B: Using Client App**
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

const getToken = async () => {
  const userCredential = await signInWithEmailAndPassword(auth, 'admin@orlogbook.com', 'Admin123!');
  const idToken = await userCredential.user.getIdToken();
  return idToken;
};
```

**Method C: Using Firebase CLI**
```bash
# Generate custom token for testing
firebase auth:export users.json --project or-logbook
```

#### Step 2: Use Token in Requests
```bash
curl -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
     "http://localhost:5001/or-logbook/us-central1/api/health"
```

### Sample Login Credentials (After Init)
- **Admin**: `admin@orlogbook.com` / `Admin123!`
- **Nurse 1**: `nurse1@orlogbook.com` / `Nurse123!`
- **Surgeon 1**: `surgeon1@orlogbook.com` / `Surgeon123!`

---

## Testing Tools

### 1. Postman Collection
Import the collection from `backend/docs/postman-collection.json`:

1. Open Postman
2. Click Import → Upload Files
3. Select `postman-collection.json`
4. Set environment variables:
   - `base_url`: `http://localhost:5001/or-logbook/us-central1/api`
   - `firebase_token`: Your Firebase ID token

### 2. cURL Examples
See `backend/docs/curl-examples.md` for comprehensive cURL examples.

### 3. Thunder Client (VS Code)
1. Install Thunder Client extension
2. Import the Postman collection JSON
3. Set up environment variables

---

## API Endpoints Overview

### Public Endpoints
- `GET /health` - Health check

### Authentication Endpoints
- `POST /api/auth/register` - Register user (Admin only)
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/users` - Get all users (Admin only)
- `PUT /api/auth/users/:userId/role` - Update user role (Admin only)
- `DELETE /api/auth/users/:userId` - Delete user (Admin only)

### Patient Endpoints
- `POST /api/patients` - Create patient
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Surgeon Endpoints
- `POST /api/surgeons` - Create surgeon
- `GET /api/surgeons` - Get all surgeons
- `GET /api/surgeons/:id` - Get surgeon by ID
- `PUT /api/surgeons/:id` - Update surgeon
- `DELETE /api/surgeons/:id` - Delete surgeon

### Operation Endpoints
- `POST /api/operations` - Create operation
- `GET /api/operations` - Get all operations
- `GET /api/operations?surgeonId=:id` - Get operations by surgeon
- `GET /api/operations?status=:status` - Get operations by status
- `GET /api/operations/:id` - Get operation by ID
- `PUT /api/operations/:id` - Update operation
- `DELETE /api/operations/:id` - Delete operation

---

## Testing Workflow

### 1. Basic Health Check
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/health"
```
Expected response:
```json
{
  "success": true,
  "message": "OR Logbook API is running",
  "timestamp": "2024-01-20T10:00:00.000Z",
  "version": "1.0.0"
}
```

### 2. Authentication Test
```bash
# Get profile (requires token)
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/auth/profile" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. CRUD Operations Test
```bash
# Create patient
curl -X POST "http://localhost:5001/or-logbook/us-central1/api/patients" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "Test",
    "lastName": "Patient",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "medicalRecordNumber": "MRN-TEST",
    "contact": "+1234567890"
  }'

# Get all patients
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/patients" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Filtering Test
```bash
# Get operations by status
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations?status=completed" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get operations by surgeon
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations?surgeonId=SURGEON_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Database Schema

### Collections Structure
```
users/{uid}
├── email: string
├── role: 'nurse' | 'surgeon' | 'admin'
├── createdAt: timestamp
└── updatedAt?: timestamp

nurses/{autoId}
├── userId: string (reference to users)
├── firstName: string
├── lastName: string
├── department: string
├── licenseNumber: string
├── contact: string
└── createdAt: timestamp

surgeons/{autoId}
├── userId: string (reference to users)
├── firstName: string
├── lastName: string
├── specialization: string
├── licenseNumber: string
├── contact: string
└── createdAt: timestamp

patients/{autoId}
├── firstName: string
├── lastName: string
├── dateOfBirth: timestamp
├── medicalRecordNumber: string
├── contact: string
├── admissionDate: timestamp
├── createdAt: timestamp
└── updatedAt: timestamp

operations/{autoId}
├── patientId: string (reference to patients)
├── surgeonId: string (reference to surgeons)
├── nurseId: string (reference to nurses)
├── operationType: string
├── operationDate: timestamp
├── scheduledStartTime: timestamp
├── actualStartTime?: timestamp
├── actualEndTime?: timestamp
├── operatingRoom: string
├── anesthesiaType: string
├── anesthesiologist: string
├── assistantSurgeons: string[]
├── complications?: string
├── outcomes?: string
├── notes?: string
├── status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
├── createdAt: timestamp
└── updatedAt: timestamp
```

---

## Troubleshooting

### Common Issues

#### 1. Emulator Connection Issues
```bash
# Check if emulators are running
firebase emulators:start --only functions,firestore

# Check ports are available
netstat -an | grep :5001
netstat -an | grep :8080
```

#### 2. Authentication Errors
- Verify Firebase ID token is valid
- Check token expiration (tokens expire after 1 hour)
- Ensure user has proper role permissions

#### 3. Database Connection Issues
- Verify Firestore emulator is running on port 8080
- Check Firestore rules allow authenticated access
- Ensure indexes are deployed

#### 4. Function Deployment Issues
```bash
# Check function logs
firebase functions:log

# Test function locally
firebase functions:shell
```

### Debug Mode
```bash
# Start emulators with debug logging
firebase emulators:start --only functions,firestore --debug

# Check emulator UI
open http://localhost:4000
```

---

## Production Deployment

### Deploy Functions
```bash
cd backend/functions
npm run deploy
```

### Deploy Firestore Rules & Indexes
```bash
cd backend
firebase deploy --only firestore:rules,firestore:indexes
```

### Deploy Storage Rules
```bash
firebase deploy --only storage
```

---

## Next Steps

1. **Test all endpoints** using Postman or cURL
2. **Verify data relationships** between collections
3. **Test role-based permissions** with different user types
4. **Deploy to production** when ready
5. **Set up monitoring** and logging
6. **Configure CI/CD** pipeline

---

## Support

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firebase Emulators**: https://firebase.google.com/docs/emulator-suite
- **Postman Documentation**: https://learning.postman.com/docs/
- **Project Issues**: Check the project repository for known issues
