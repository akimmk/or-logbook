import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placehold.co/96x96/png?text=N' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Title style={styles.name}>Nurse Abebe</Title>
          <Text style={styles.role}>Registered Nurse</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text>abebe@example.com</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Employee ID</Text>
        <Text>RN-00123</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Department</Text>
        <Text>General Surgery Ward</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Phone</Text>
        <Text>+251 9xx xxx xxx</Text>

        <Button mode="contained" style={styles.editBtn} onPress={() => console.log('Edit profile')}>Edit Profile</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#eee' },
  userInfo: { marginLeft: 12 },
  name: { marginBottom: 4 },
  role: { color: '#666' },
  card: { backgroundColor: '#fafafa', padding: 16, borderRadius: 10, elevation: 2 },
  label: { fontWeight: '700', color: '#333' },
  editBtn: { marginTop: 16 },
});
