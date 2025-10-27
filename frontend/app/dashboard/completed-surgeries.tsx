import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { SafeAreaView, View, FlatList, TextInput } from 'react-native';
import { Text, Title } from 'react-native-paper';
import cs from './commonStyles';

// Data should come from Firestore. Removed hardcoded sample data.
const DUMMY: { id: string; patient: string; date: string; outcome: string }[] = [];

export default function CompletedSurgeriesScreen() {
  const [query, setQuery] = useState('');

  const filtered = DUMMY.filter((d) => d.patient.toLowerCase().includes(query.toLowerCase()));

  return (
    <ProtectedRoute requiredRole={["nurse", "surgeon"]}>
      <SafeAreaView style={cs.safe}>
        <View style={cs.pageContainer}>
          <View style={cs.content}>
          <Title style={cs.title}>Completed Surgeries</Title>
          <Text style={cs.subtitle}>View and search past operations</Text>

          <View style={{ width: '100%', marginBottom: 12 }}>
            <TextInput
              placeholder="Search patient"
              value={query}
              onChangeText={setQuery}
              style={cs.input}
            />
          </View>

          {filtered.length === 0 ? (
            <View style={[cs.section, { alignItems: 'center' }]}> 
              <Text style={{ color: '#666' }}>No completed surgeries found.</Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[cs.section, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                  <View>
                    <Text style={{ fontWeight: '600' }}>{item.patient}</Text>
                    <Text style={{ color: '#666', marginTop: 4 }}>{item.date} • {item.outcome}</Text>
                  </View>
                </View>
              )}
            />
          )}
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

// styling moved to commonStyles
