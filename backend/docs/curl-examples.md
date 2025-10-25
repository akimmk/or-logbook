# OR Logbook API - cURL Examples

## Prerequisites
1. Start Firebase emulators: `firebase emulators:start --only functions,firestore`
2. Run database initialization: `npm run init-db` (from backend/functions/)
3. Get Firebase ID token from your client app or Firebase Console

## Base URL
- Local: `http://localhost:5001/or-logbook/us-central1/api`
- Production: `https://us-central1-or-logbook.cloudfunctions.net/api`

## Authentication
All protected endpoints require a Firebase ID token in the Authorization header:
```bash
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

---

## Health Check
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/health"
```

---

## Authentication Endpoints

### Register User (Admin Only)
```bash
curl -X POST "http://localhost:5001/or-logbook/us-central1/api/auth/register" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123!",
    "role": "nurse",
    "additionalData": {
      "firstName": "John",
      "lastName": "Doe",
      "department": "Operating Room",
      "licenseNumber": "RN-001236",
      "contact": "+1234567897"
    }
  }'
```

### Get User Profile
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/auth/profile" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get All Users (Admin Only)
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/auth/users" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Update User Role (Admin Only)
```bash
curl -X PUT "http://localhost:5001/or-logbook/us-central1/api/auth/users/USER_ID/role" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "role": "surgeon"
  }'
```

### Delete User (Admin Only)
```bash
curl -X DELETE "http://localhost:5001/or-logbook/us-central1/api/auth/users/USER_ID" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## Patient Endpoints

### Create Patient
```bash
curl -X POST "http://localhost:5001/or-logbook/us-central1/api/patients" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "dateOfBirth": "1985-03-15T00:00:00.000Z",
    "medicalRecordNumber": "MRN-004",
    "contact": "+1234567898",
    "admissionDate": "2024-01-18T00:00:00.000Z"
  }'
```

### Get All Patients
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/patients" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Patient by ID
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/patients/PATIENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Patient
```bash
curl -X PUT "http://localhost:5001/or-logbook/us-central1/api/patients/PATIENT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "Alice Updated",
    "lastName": "Johnson",
    "contact": "+1234567899"
  }'
```

### Delete Patient
```bash
curl -X DELETE "http://localhost:5001/or-logbook/us-central1/api/patients/PATIENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Surgeon Endpoints

### Create Surgeon
```bash
curl -X POST "http://localhost:5001/or-logbook/us-central1/api/surgeons" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "Dr. Sarah",
    "lastName": "Miller",
    "specialization": "Neurosurgery",
    "licenseNumber": "MD-001236",
    "contact": "+1234567900"
  }'
```

### Get All Surgeons
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/surgeons" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Surgeon by ID
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/surgeons/SURGEON_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Surgeon
```bash
curl -X PUT "http://localhost:5001/or-logbook/us-central1/api/surgeons/SURGEON_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "specialization": "Pediatric Surgery",
    "contact": "+1234567901"
  }'
```

### Delete Surgeon
```bash
curl -X DELETE "http://localhost:5001/or-logbook/us-central1/api/surgeons/SURGEON_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Operation Endpoints

### Create Operation
```bash
curl -X POST "http://localhost:5001/or-logbook/us-central1/api/operations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "patientId": "PATIENT_ID",
    "surgeonId": "SURGEON_ID",
    "operationType": "Appendectomy",
    "operationDate": "2024-01-22T00:00:00.000Z",
    "scheduledStartTime": "2024-01-22T14:00:00.000Z",
    "operatingRoom": "OR-3",
    "anesthesiaType": "General",
    "anesthesiologist": "Dr. Anesthesia Wilson",
    "assistantSurgeons": ["Dr. Assistant Smith"],
    "status": "scheduled"
  }'
```

### Get All Operations
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Operations by Surgeon
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations?surgeonId=SURGEON_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Operations by Status
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations?status=completed" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Operations by Date Range
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Operation by ID
```bash
curl -X GET "http://localhost:5001/or-logbook/us-central1/api/operations/OPERATION_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Operation
```bash
curl -X PUT "http://localhost:5001/or-logbook/us-central1/api/operations/OPERATION_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "actualStartTime": "2024-01-22T14:15:00.000Z",
    "actualEndTime": "2024-01-22T16:30:00.000Z",
    "status": "completed",
    "outcomes": "Successful",
    "notes": "Procedure completed without complications"
  }'
```

### Delete Operation
```bash
curl -X DELETE "http://localhost:5001/or-logbook/us-central1/api/operations/OPERATION_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Sample Test Data IDs (After Running Init Script)

### Admin User
- Email: `admin@orlogbook.com`
- Password: `Admin123!`

### Nurses
- Email: `nurse1@orlogbook.com` / Password: `Nurse123!`
- Email: `nurse2@orlogbook.com` / Password: `Nurse123!`

### Surgeons
- Email: `surgeon1@orlogbook.com` / Password: `Surgeon123!`
- Email: `surgeon2@orlogbook.com` / Password: `Surgeon123!`

### Patients
- Medical Record Numbers: `MRN-001`, `MRN-002`, `MRN-003`

---

## Getting Firebase ID Token

### Method 1: Using Firebase Console
1. Go to Firebase Console → Authentication → Users
2. Click on a user → Copy UID
3. Use Firebase Admin SDK to generate custom token

### Method 2: Using Client App
```javascript
// In your React Native app
import { signInWithEmailAndPassword } from 'firebase/auth';

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    console.log('ID Token:', idToken);
    return idToken;
  } catch (error) {
    console.error('Sign in error:', error);
  }
};
```

### Method 3: Using Firebase CLI
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login and get token
firebase login
firebase auth:export users.json --project your-project-id
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized - Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden - Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Field validation errors"]
}
```

---

## Testing Workflow

1. **Start emulators and seed data:**
   ```bash
   cd backend
   firebase emulators:start --only functions,firestore
   # In another terminal:
   cd functions
   npm run init-db
   ```

2. **Get admin token** (use one of the methods above)

3. **Test basic endpoints:**
   ```bash
   # Health check
   curl -X GET "http://localhost:5001/or-logbook/us-central1/api/health"
   
   # Get profile
   curl -X GET "http://localhost:5001/or-logbook/us-central1/api/auth/profile" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

4. **Test CRUD operations** using the examples above

5. **Test filtering and search** with query parameters
