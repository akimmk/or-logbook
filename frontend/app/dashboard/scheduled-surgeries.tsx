import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { SafeAreaView, View, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

type Item = { id: string; patient: string; date: string; time: string; ward?: string };

// Data should come from Firestore. Start with empty list instead of hardcoded examples.
const INITIAL: Item[] = [];

export default function ScheduledSurgeriesScreen() {
  const [data, setData] = useState<Item[]>(INITIAL);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftPatient, setDraftPatient] = useState('');
  const router = useRouter();

  function startEdit(item: Item) {
    setEditingId(item.id);
    setDraftPatient(item.patient);
  }

  function saveEdit() {
    if (!editingId) return;
    setData((prev) => prev.map((it) => (it.id === editingId ? { ...it, patient: draftPatient } : it)));
    setEditingId(null);
    setDraftPatient('');
    Alert.alert('Saved', 'Scheduled surgery updated');
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftPatient('');
  }

  return (
    <ProtectedRoute requiredRole={["nurse", "surgeon"]}>
      <SafeAreaView style={styles.safe}>
      <Title>Scheduled Surgeries</Title>
      <Text style={styles.subtitle}>Edit or view upcoming operations</Text>

      {data.length === 0 ? (
        <View style={{ padding: 12 }}>
          <Text style={{ color: '#666' }}>No scheduled surgeries found.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {editingId === item.id ? (
                <View style={styles.editWrap}>
                  <TextInput value={draftPatient} onChangeText={setDraftPatient} style={styles.input} />
                  <View style={styles.editBtns}>
                    <Button mode="contained" onPress={saveEdit} compact>Save</Button>
                    <Button mode="outlined" onPress={cancelEdit} compact>Cancel</Button>
                  </View>
                </View>
              ) : (
                <View style={styles.itemRow}>
                  <View>
                    <Text style={styles.patient}>{item.patient}</Text>
                    <Text style={styles.meta}>{item.date} • {item.time} • {item.ward}</Text>
                  </View>
                  <View style={styles.actions}>
                    <Button mode="outlined" onPress={() => startEdit(item)}>Edit</Button>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button mode="contained" onPress={() => router.push('/dashboard/add-patient')}>Add Patient</Button>
        <Button mode="outlined" onPress={() => router.push('/dashboard/completed-surgeries')}>Completed</Button>
      </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, backgroundColor: '#fff' },
  subtitle: { marginBottom: 12, color: '#666' },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  patient: { fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
  actions: { marginLeft: 12 },
  editWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  editBtns: { flexDirection: 'row', gap: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, flex: 1, marginRight: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});
