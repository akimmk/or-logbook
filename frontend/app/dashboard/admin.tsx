import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, Title, useTheme } from 'react-native-paper';

export default function AdminDashboard() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Icon size={56} icon="shield-account" style={{ backgroundColor: theme.colors.primary }} />
          <View style={{ marginLeft: 12 }}>
            <Title style={styles.title}>Admin</Title>
            <Text style={styles.subtitle}>System overview & management</Text>
          </View>
        </View>
        <Button mode="outlined" onPress={() => router.push('/login')}>Sign out</Button>
      </View>

      <View style={styles.metricsRow}>
        <Card style={[styles.metricCard, { borderLeftColor: '#4B5563' }]}> 
          <Card.Content>
            <Text style={styles.metricLabel}>Users</Text>
            <Text style={styles.metricValue}>—</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.metricCard, { borderLeftColor: '#059669' }]}> 
          <Card.Content>
            <Text style={styles.metricLabel}>Operations</Text>
            <Text style={styles.metricValue}>—</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.metricCard, { borderLeftColor: '#2563EB' }]}> 
          <Card.Content>
            <Text style={styles.metricLabel}>Equipment</Text>
            <Text style={styles.metricValue}>—</Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.card}>
        <Card.Title title="User Management" subtitle="Create, edit and manage accounts" />
        <Card.Content>
          <Text>- Create / Edit / Deactivate accounts</Text>
          <Text>- View activity logs</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Reports & Analytics" subtitle="Key metrics & exports" />
        <Card.Content>
          <Text>- Operation volumes</Text>
          <Text>- Resource tracking</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={() => router.push('/login')} style={styles.btn}>Open User Management</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  title: { marginBottom: 2 },
  subtitle: { marginBottom: 6, color: '#6B7280' },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metricCard: { flex: 1, marginHorizontal: 4, borderLeftWidth: 6, paddingVertical: 8 },
  metricLabel: { color: '#6B7280' },
  metricValue: { fontSize: 18, fontWeight: '700' },
  card: { marginBottom: 12 },
  btn: { marginTop: 12 },
});
