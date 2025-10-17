import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';

export default function NurseDashboard() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Nurse Dashboard</Title>
      <Text style={styles.subtitle}>Patient lists, quick forms and daily tasks.</Text>

      <Card style={styles.card}>
        <Card.Title title="Today's Tasks" />
        <Card.Content>
          <Text>- Vitals for Room 101</Text>
          <Text>- Prep patient for 09:00 surgery</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={() => router.push('/login')} style={styles.btn}>Sign out</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { marginBottom: 6 },
  subtitle: { marginBottom: 12, color: '#444' },
  card: { marginBottom: 12 },
  btn: { marginTop: 12 },
});
