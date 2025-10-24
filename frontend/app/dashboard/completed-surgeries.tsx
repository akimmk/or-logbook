import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Text, Title } from 'react-native-paper';

const DUMMY = [
  { id: '1', patient: 'John Doe', date: '2025-10-10', outcome: 'Successful' },
  { id: '2', patient: 'Jane Smith', date: '2025-09-22', outcome: 'Pending' },
  { id: '3', patient: 'Abebe Kidane', date: '2025-08-12', outcome: 'Successful' },
];

export default function CompletedSurgeriesScreen() {
  const [query, setQuery] = useState('');

  const filtered = DUMMY.filter((d) => d.patient.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.safe}>
      <Title style={styles.title}>Completed Surgeries</Title>
      <Text style={styles.subtitle}>View and search past operations</Text>

      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search patient"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.patient}>{item.patient}</Text>
            <Text style={styles.meta}>{item.date} • {item.outcome}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { marginBottom: 4 },
  subtitle: { marginBottom: 12, color: '#666' },
  searchWrap: { marginBottom: 12 },
  search: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  patient: { fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
});
