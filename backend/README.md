# OR Logbook Backend API

A comprehensive backend system for managing hospital Operating Room (OR) logbook entries, built with Node.js, Express.js, and Firebase Cloud Functions.

## 🏗️ Architecture

- **Framework**: Express.js wrapped in Firebase Cloud Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication with custom claims
- **Deployment**: Firebase Cloud Functions
- **Pattern**: Model-Service-Controller (MSC) architecture

## 🚀 Features

### User Roles
- **Nurse**: Create operation log entries, manage patients
- **Surgeon**: View assigned patients and operations, update operation status
- **Admin**: Full system access, manage all users and operations

### Core Functionality
- User registration and authentication with role-based access
- Patient management (CRUD operations)
- Surgeon profile management
- Operation log creation and management
- Real-time filtering and search capabilities
- Comprehensive statistics and reporting

## 📁 Project Structure

```
backend/functions/
├── src/
│   ├── config/
│   │   └── firebaseConfig.js          # Firebase Admin SDK configuration
│   ├── models/
│   │   ├── User.js                    # User model with role validation
│   │   ├── Nurse.js                   # Nurse profile model
│   │   ├── Patient.js                 # Patient model
│   │   ├── Surgeon.js                 # Surgeon profile model
│   │   └── Operation.js               # Operation log model
│   ├── services/
│   │   ├── authService.js             # Authentication business logic
│   │   ├── patientService.js          # Patient management logic
│   │   ├── surgeonService.js          # Surgeon management logic
│   │   └── operationService.js        # Operation management logic
│   ├── controllers/
│   │   ├── authController.js          # Authentication endpoints
│   │   ├── patientController.js       # Patient endpoints
│   │   ├── surgeonController.js       # Surgeon endpoints
│   │   └── operationController.js     # Operation endpoints
│   ├── routes/
│   │   ├── authRoutes.js              # Authentication routes
│   │   ├── patientRoutes.js           # Patient routes
│   │   ├── surgeonRoutes.js           # Surgeon routes
│   │   └── operationRoutes.js         # Operation routes
│   ├── middlewares/
│   │   └── verifyToken.js             # JWT verification and role-based access
│   ├── app.js                         # Express application setup
│   └── index.ts                       # Cloud Function entry point
├── package.json                       # Dependencies and scripts
├── .gitignore                         # Git ignore rules
└── env.example                        # Environment variables template
```

## 🛠️ Setup Instructions

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Firebase CLI** (`npm install -g firebase-tools`)
3. **Firebase Project** with Firestore and Authentication enabled

### 1. Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Authentication** (Email/Password provider)
   - **Firestore Database**
   - **Cloud Functions**

### 2. Local Development Setup

1. **Clone and navigate to the project:**
   ```bash
   cd backend/functions
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your Firebase project details
   ```

4. **Login to Firebase:**
   ```bash
   firebase login
   ```

5. **Initialize Firebase project:**
   ```bash
   firebase init
   # Select: Functions, Firestore, Hosting (optional)
   ```

6. **Start local development:**
   ```bash
   # Start Firebase emulators
   firebase emulators:start
   
   # Or run with nodemon for development
   npm run dev
   ```

### 3. Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy --only functions
   ```

## 🔧 API Documentation

### Base URL
- **Local**: `http://localhost:5001/your-project-id/us-central1/api`
- **Production**: `https://us-central1-your-project-id.cloudfunctions.net/api`

### Authentication

All endpoints except `/api/auth/register` require a valid Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

### Endpoints

#### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| GET | `/profile` | Get user profile | Authenticated |
| PUT | `/users/:userId/role` | Update user role | Admin |
| DELETE | `/users/:userId` | Delete user | Admin |
| GET | `/users` | Get all users | Admin |

**Register User Example:**
```json
POST /api/auth/register
{
  "email": "nurse@hospital.com",
  "password": "password123",
  "role": "nurse",
  "firstName": "Jane",
  "lastName": "Smith",
  "department": "Surgery",
  "licenseNumber": "RN123456"
}
```

#### Patients (`/api/patients`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Create patient | Nurse/Admin |
| GET | `/` | Get all patients | Authenticated |
| GET | `/search` | Search patients | Authenticated |
| GET | `/:id` | Get patient by ID | Authenticated |
| PUT | `/:id` | Update patient | Nurse/Admin |
| DELETE | `/:id` | Delete patient | Nurse/Admin |
| GET | `/stats` | Get patient statistics | Authenticated |

**Create Patient Example:**
```json
POST /api/patients
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1980-05-15",
  "medicalRecordNumber": "MRN123456",
  "contact": "+1234567890",
  "admissionDate": "2024-01-15"
}
```

#### Surgeons (`/api/surgeons`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Create surgeon | Admin |
| GET | `/` | Get all surgeons | Authenticated |
| GET | `/my-profile` | Get current surgeon profile | Surgeon/Admin |
| PUT | `/my-profile` | Update current surgeon profile | Surgeon/Admin |
| GET | `/:id` | Get surgeon by ID | Authenticated |
| GET | `/:id/patients` | Get surgeon's patients | Surgeon/Admin |
| GET | `/:id/upcoming-operations` | Get upcoming operations | Surgeon/Admin |
| GET | `/:id/stats` | Get surgeon statistics | Surgeon/Admin |

#### Operations (`/api/operations`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Create operation | Nurse |
| GET | `/` | Get all operations | Authenticated |
| GET | `/my-operations` | Get user's operations | Authenticated |
| GET | `/today` | Get today's operations | Authenticated |
| GET | `/date-range` | Get operations by date range | Authenticated |
| GET | `/stats` | Get operation statistics | Authenticated |
| GET | `/:id` | Get operation by ID | Authenticated |
| PUT | `/:id` | Update operation | Admin |
| PUT | `/:id/status` | Update operation status | Surgeon/Admin |
| DELETE | `/:id` | Delete operation | Admin |

**Create Operation Example:**
```json
POST /api/operations
{
  "patientId": "patient-id-123",
  "surgeonId": "surgeon-id-456",
  "operationType": "Appendectomy",
  "operationDate": "2024-01-20",
  "scheduledStartTime": "2024-01-20T09:00:00Z",
  "operatingRoom": "OR-1",
  "anesthesiaType": "General",
  "anesthesiologist": "Dr. Anesthesia",
  "notes": "Routine appendectomy"
}
```

### Query Parameters

#### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

#### Filtering
- `patientId`: Filter by patient ID
- `surgeonId`: Filter by surgeon ID
- `nurseId`: Filter by nurse ID
- `status`: Filter by operation status
- `operatingRoom`: Filter by operating room
- `startDate`: Filter by start date (ISO format)
- `endDate`: Filter by end date (ISO format)
- `search`: Search term for patients

### Response Format

All responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## 🔐 Security

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Nurse** | Create operations, manage patients, view all operations |
| **Surgeon** | View assigned patients/operations, update operation status |
| **Admin** | Full system access, manage users, update/delete operations |

### Authentication Flow

1. Client authenticates with Firebase Auth
2. Server verifies Firebase ID token
3. Custom claims provide user role information
4. Middleware enforces role-based access control

## 🚀 Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start Firebase emulators
npm run serve

# Deploy to Firebase
npm run deploy

# View logs
npm run logs
```

### Local Testing

1. Start Firebase emulators:
   ```bash
   firebase emulators:start
   ```

2. The API will be available at:
   ```
   http://localhost:5001/your-project-id/us-central1/api
   ```

3. Use Firebase Auth emulator for testing authentication

## 📊 Data Models

### User
- `uid`: Firebase user ID
- `email`: User email
- `role`: User role (nurse/surgeon/admin)
- `createdAt`: Account creation timestamp

### Patient
- `id`: Document ID
- `firstName`: Patient first name
- `lastName`: Patient last name
- `dateOfBirth`: Date of birth
- `medicalRecordNumber`: Unique medical record number
- `contact`: Contact information
- `admissionDate`: Hospital admission date
- `createdAt`: Record creation timestamp
- `updatedAt`: Last update timestamp

### Operation
- `id`: Document ID
- `patientId`: Reference to patient
- `surgeonId`: Reference to surgeon
- `nurseId`: Reference to nurse who created the log
- `operationType`: Type of operation
- `operationDate`: Scheduled operation date
- `scheduledStartTime`: Planned start time
- `actualStartTime`: Actual start time
- `actualEndTime`: Actual end time
- `operatingRoom`: Operating room identifier
- `anesthesiaType`: Type of anesthesia
- `anesthesiologist`: Anesthesiologist name
- `assistantSurgeons`: Array of assistant surgeons
- `complications`: Any complications noted
- `outcomes`: Operation outcomes
- `notes`: Additional notes
- `status`: Operation status (scheduled/in-progress/completed/cancelled)
- `createdAt`: Log creation timestamp
- `updatedAt`: Last update timestamp

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Authentication Error**
   - Ensure Firebase project has Authentication enabled
   - Check that email/password provider is enabled
   - Verify Firebase project configuration

2. **Firestore Permission Denied**
   - Check Firestore security rules
   - Ensure user has proper authentication
   - Verify collection and document access

3. **Cloud Function Deployment Issues**
   - Ensure all dependencies are installed
   - Check Firebase CLI is logged in
   - Verify project ID is correct

4. **CORS Issues**
   - Check CORS configuration in app.js
   - Ensure frontend URL is whitelisted
   - Verify preflight request handling

### Debug Mode

Set `NODE_ENV=development` to enable detailed error messages and stack traces.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
