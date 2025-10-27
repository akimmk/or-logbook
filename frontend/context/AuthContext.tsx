import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { initFirebase, onAuthStateChanged, fetchUserByUID, signIn as firebaseSignIn, signOut as firebaseSignOut } from '../firebase';
import { auth } from '../FirebaseConfig';

type AuthUser = { uid: string; email?: string } | null;

type AuthContextShape = {
  user: AuthUser;
  role?: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextShape>({
  user: null,
  role: null,
  loading: true,
  // placeholders
  signIn: async () => {},
  signOut: async () => {},
  getToken: async () => null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      initFirebase();
    } catch (err) {
      console.error('Firebase init failed in AuthProvider', err);
    }

    const unsub = onAuthStateChanged(async (u) => {
      if (!u) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setUser(u);
      setLoading(true);

      try {
        const doc = await fetchUserByUID(u.uid);
        setRole(doc?.role || null);
      } catch (err) {
        console.error('Failed to fetch user role', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      await firebaseSignIn(email, password);
      // onAuthStateChanged will pick up the user and load role
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await firebaseSignOut();
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }

  async function getToken() {
    try {
      const current = auth.currentUser;
      if (!current) return null;
      const token = await current.getIdToken();
      return token;
    } catch (err) {
      console.error('Failed to get ID token', err);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
