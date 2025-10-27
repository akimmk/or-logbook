import { auth, db } from './FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';

/**
 * Minimal user profile shape stored in Firestore
 */
export type UserProfile = {
  uid: string;
  email: string;
  role: 'admin' | 'surgeon' | 'nurse' | string;
  status?: string;
  createdAt?: string;
  fullname?: string;
  title?: string;
  [key: string]: any;
};

/**
 * Initialize Firebase (idempotent). Returns app-level handles.
 */
export function initFirebase() {
  // FirebaseConfig.ts already initializes the app and exports `auth` and `db`.
  if (!auth || !db) {
    const msg = 'Firebase not configured. Check FirebaseConfig.ts and app.config.js extras.';
    console.error(msg);
    throw new Error(msg);
  }
  console.log('Firebase init OK');
  return { auth, db };
}

function mapAuthError(code: string | undefined, defaultMsg = 'Authentication error') {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-not-found':
      return 'No user found with that email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-api-key':
      return 'Firebase API key invalid or missing. Check configuration.';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/weak-password':
      return 'Password is too weak (min 6 characters)';
    default:
      return defaultMsg;
  }
}

/**
 * Sign in with email and password.
 * Returns { uid, email }
 */
export async function signIn(email: string, password: string): Promise<{ uid: string; email: string }>{
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const u = userCred.user;
    return { uid: u.uid, email: u.email || email };
  } catch (err: any) {
    const msg = mapAuthError(err?.code, err?.message || 'Sign in failed');
    throw new Error(msg);
  }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

/**
 * Sign up (client-side MVP).
 * TODO: Replace client-side user creation with a Cloud Function using the Admin SDK for production.
 * Client-side creation allows privilege escalation if the client is compromised.
 */
export async function signUp(
  email: string,
  password: string,
  role: 'admin' | 'surgeon' | 'nurse',
  extra: { fullname?: string; title?: string; [key: string]: any } = {}
): Promise<{ uid: string; email: string }> {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    const payload: Partial<UserProfile> = {
      uid,
      email,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
      fullname: extra.fullname,
      title: extra.title,
      ...extra,
    };

    // Write Firestore users doc
    await setDoc(doc(db, 'users', uid), payload as DocumentData);

    return { uid, email };
  } catch (err: any) {
    const msg = mapAuthError(err?.code, err?.message || 'Sign up failed');
    throw new Error(msg);
  }
}

/**
 * Fetch a user document by UID.
 */
export async function fetchUserByUID(uid: string): Promise<UserProfile | null> {
  try {
    const d = await getDoc(doc(db, 'users', uid));
    if (!d.exists()) return null;
  const data = d.data() as UserProfile;
  return { ...(data as UserProfile), uid } as UserProfile;
  } catch (err: any) {
    throw new Error('Failed to fetch user by UID: ' + (err?.message || err));
  }
}

/**
 * Fetch a user by email (returns first match) — useful for admin/debug.
 */
export async function fetchUserByEmail(email: string): Promise<UserProfile | null> {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
  return { ...(docSnap.data() as UserProfile), uid: docSnap.id } as UserProfile;
  } catch (err: any) {
    throw new Error('Failed to fetch user by email: ' + (err?.message || err));
  }
}

/**
 * Get simplified current user info from auth state.
 */
export function getCurrentUser(): { uid: string; email?: string } | null {
  const u: FirebaseUser | null = auth.currentUser;
  if (!u) return null;
  return { uid: u.uid, email: u.email || undefined };
}

/**
 * Subscribe to auth state changes. Returns unsubscribe function.
 */
export function onAuthStateChanged(cb: (user: { uid: string; email?: string } | null) => void) {
  return firebaseOnAuthStateChanged(auth, (u) => {
    if (!u) return cb(null);
    cb({ uid: u.uid, email: u.email || undefined });
  });
}
