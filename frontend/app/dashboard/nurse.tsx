import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

export default function NurseDashboardScreen() {
  const router = useRouter();

  function handleSignOut() {
    // placeholder sign-out
    console.log('handleSignOut pressed');
    router.push('/login');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Title style={styles.title}>Nurse Dashboard</Title>
          <Text style={styles.subtitle}>Welcome, Nurse Abebe</Text>
        </View>

        <View style={styles.headerRight}>
          <Button compact onPress={() => router.push('/dashboard/profile')}>Profile</Button>
          <Button compact onPress={handleSignOut}>Sign Out</Button>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/dashboard/scheduled-surgeries')}
        >
          <Text style={styles.cardTitle}>Total Surgeries Scheduled</Text>
          <Text style={styles.cardSubtitle}>View upcoming surgeries</Text>
          <Text style={styles.cardNumber}>5 scheduled</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/dashboard/completed-surgeries')}
        >
          <Text style={styles.cardTitle}>Completed Surgeries Log</Text>
          <Text style={styles.cardSubtitle}>View past operations and search patients</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/dashboard/add-patient')}
        >
          <Text style={styles.cardTitle}>Add New Surgery Record</Text>
          <Text style={styles.cardSubtitle}>Register a new patient for surgery</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', gap: 8 },
  title: { marginBottom: 2 },
  subtitle: { color: '#555' },
  container: { padding: 16 },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSubtitle: { color: '#666', marginTop: 6 },
  cardNumber: { marginTop: 10, fontSize: 18, fontWeight: '700' },
  btn: { marginTop: 12 },
});
