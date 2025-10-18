import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const env = process.env as any;
const extra = (Constants.manifest && (Constants.manifest as any).extra) || {};

const firebaseConfig = {
  apiKey: env.EXPO_FIREBASE_API_KEY || extra.FIREBASE_API_KEY,
  authDomain: env.EXPO_FIREBASE_AUTH_DOMAIN || extra.FIREBASE_AUTH_DOMAIN,
  projectId: env.EXPO_FIREBASE_PROJECT_ID || extra.FIREBASE_PROJECT_ID,
  storageBucket: env.EXPO_FIREBASE_STORAGE_BUCKET || extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.EXPO_FIREBASE_MESSAGING_SENDER_ID || extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.EXPO_FIREBASE_APP_ID || extra.FIREBASE_APP_ID,
  measurementId: env.EXPO_FIREBASE_MEASUREMENT_ID || extra.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
