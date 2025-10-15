# 🏥 Digital OR Logbook App

A modern **mobile application** that digitizes the traditional **Operating Room (OR) Logbook** used in hospitals.  
This app allows nurses to record surgical data, surgeons to review and verify cases, and administrators to manage records — all in real time using **Firebase**.

---

## 📱 Tech Stack

**Frontend:**
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/) or [Native Base](https://nativebase.io/) for UI components

**Backend:**
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)

**Development Tools:**
- Node.js 20+
- Expo CLI
- VS Code (recommended)

---

## 🧩 Features

✅ Role-based access (Nurse, Surgeon, Admin)  
✅ Real-time surgery log updates via Firestore  
✅ Add, view, edit, and delete operation records  
✅ Secure authentication and data protection  
✅ Offline data caching (Firestore offline mode)  
✅ Simple and clean UI for hospital environments  
✅ Dashboard summaries and daily statistics  
✅ Future support for PDF/Excel report generation  

---

## 🧱 Project Structure

```

or-logbook/
│
├── assets/                # App images, icons, logos
├── components/            # Reusable components (Cards, Forms, etc.)
├── navigation/            # App navigation setup
├── screens/               # App screens (Login, Dashboard, etc.)
│   ├── LoginScreen.js
│   ├── DashboardScreen.js
│   ├── AddLogScreen.js
│   ├── ViewLogsScreen.js
│   ├── SurgeryDetailsScreen.js
│   └── ProfileScreen.js
├── services/              # Firebase configuration and helpers
│   └── firebase.js
├── utils/                 # Helper functions and constants
├── App.js                 # Main entry point
└── package.json

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/akimmk/or-logbook.git
cd or-logbook
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project
3. Enable:

   * **Authentication (Email/Password)**
   * **Cloud Firestore**
   * **Storage**
4. Copy your Firebase config and paste it inside `services/firebase.js`

Example:

```js
// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 4. Start the Development Server

```bash
npx expo start
```

Scan the QR code using the **Expo Go** app on your phone.

---

## 👥 User Roles

| Role        | Capabilities                            |
| ----------- | --------------------------------------- |
| **Nurse**   | Create and edit surgery logs            |
| **Surgeon** | View and verify assigned cases          |
| **Admin**   | Manage users, view reports, full access |

---

## 🗃️ Firestore Structure Example

```
collections/
├── users/
│   └── {userId}
│       ├── name
│       ├── role
│       └── department
├── logs/
│   └── {logId}
│       ├── patientName
│       ├── diagnosis
│       ├── procedure
│       ├── surgeon
│       ├── anesthesiaType
│       ├── startTime
│       ├── endTime
│       ├── remarks
│       ├── createdBy (nurse)
│       └── verifiedBy (surgeon)
```

---

## 🧠 Future Enhancements

* PDF/Excel report generation
* Admin analytics dashboard
* Multi-hospital support
* Offline-first data sync
* Push notifications for updates

---

## 🤝 Contributing

Pull requests are welcome!
If you’d like to contribute, please fork the repo and submit a PR.

---

## 🩺 Contributors

**Mikiyas Damtew**
💼 Bachelor of Computer Science — University of Gondar
🌍 Building practical digital solutions for healthcare

**Samuel Aemro**
💼 Bachelor of Information Systems — University of Gondar
🌍 Building practical digital solutions for healthcare

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it.

---

```

---

Would you like me to add a version **with GitHub badges** (Expo SDK version, Firebase, License, and Platform) at the top for a more professional repo appearance?
```
