import { useRouter } from 'expo-router';
import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Surface, Text, Title } from 'react-native-paper';

export default function SurgeonDashboard() {
  const router = useRouter();

  return (
    <ProtectedRoute requiredRole="surgeon">
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Surgeon Dashboard</Title>
        <Text style={styles.subtitle}>Focused on today&apos;s schedule and patient summaries</Text>
      </View>

      <Surface style={styles.kpiRow}>
        <View style={styles.kpiItem}><Text style={styles.kpiLabel}>Today</Text><Text style={styles.kpiValue}>—</Text></View>
        <View style={styles.kpiItem}><Text style={styles.kpiLabel}>Upcoming</Text><Text style={styles.kpiValue}>—</Text></View>
        <View style={styles.kpiItem}><Text style={styles.kpiLabel}>Notes</Text><Text style={styles.kpiValue}>—</Text></View>
      </Surface>

      <Card style={styles.card}>
        <Card.Title title="Today's Operations" />
        <Card.Content>
          <Text style={styles.opItem}>No scheduled operations</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Patient Notes" />
        <Card.Content>
          <Text>- Quick access to records and notes</Text>
        </Card.Content>
      </Card>

        <Button mode="contained" onPress={() => router.push('/login')} style={styles.btn}>Sign out</Button>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { marginBottom: 12 },
  title: { fontSize: 22, marginBottom: 4 },
  subtitle: { marginBottom: 12, color: '#374151' },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, marginBottom: 12 },
  kpiItem: { alignItems: 'center', flex: 1 },
  kpiLabel: { color: '#6B7280' },
  kpiValue: { fontSize: 18, fontWeight: '700' },
  card: { marginBottom: 12 },
  opItem: { marginBottom: 6 },
  btn: { marginTop: 12 },
});
