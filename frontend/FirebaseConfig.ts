import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1WhdiLwgItQ5_0F82N4jRxVsjOQijhgI",
  authDomain: "or-logbook.firebaseapp.com",
  projectId: "or-logbook",
  storageBucket: "or-logbook.firebasestorage.app",
  messagingSenderId: "226414641955",
  appId: "1:226414641955:web:d3114c76902b4122d94296",
  measurementId: "G-KF34WB4B8W"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});