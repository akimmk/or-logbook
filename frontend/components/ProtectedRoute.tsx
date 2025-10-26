import React, { ReactNode, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Redirect } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

type Props = {
  children: ReactNode;
  requiredRole?: string | string[];
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, role, loading } = useContext(AuthContext);
  

  useEffect(() => {
    // keep effect for side-effects or logging; redirect is handled synchronously in render
    if (loading) return;
    // nothing else needed here; render will return Redirect when required
  }, [user, role, loading, requiredRole]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) return <Redirect href="/login" />;

  if (requiredRole) {
    const ok = Array.isArray(requiredRole) ? requiredRole.includes(role || '') : role === requiredRole;
    if (!ok) return <Redirect href="/unauthorized" />;
  }

  return <>{children}</>;
}
