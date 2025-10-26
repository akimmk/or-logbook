import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function UnauthorizedScreen() {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Title>Unauthorized</Title>
  <Text style={{ marginVertical: 12 }}>You do not have permission to view this page.</Text>
        <Button mode="contained" onPress={() => router.replace('/')}>Home</Button>
        <Button style={{ marginTop: 8 }} mode="outlined" onPress={() => { signOut(); router.replace('/login'); }}>Sign out</Button>
      </View>
    </SafeAreaView>
  );
}
