import { auth, db } from './FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

export async function signIn(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function createUser(email: string, password: string, role: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  await setDoc(doc(db, 'users', uid), { email, role, status: 'active', createdAt: new Date().toISOString() });
  return { uid };
}

export async function fetchUserByUid(uid: string) {
  const d = await getDoc(doc(db, 'users', uid));
  return d.exists() ? d.data() : null;
}

export async function fetchUserByEmail(email: string) {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data();
}
