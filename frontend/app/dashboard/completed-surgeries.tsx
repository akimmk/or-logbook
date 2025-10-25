import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, TextInput } from 'react-native';
import { Text, Title } from 'react-native-paper';
import cs from './commonStyles';

const DUMMY = [
  { id: '1', patient: 'John Doe', date: '2025-10-10', outcome: 'Successful' },
  { id: '2', patient: 'Jane Smith', date: '2025-09-22', outcome: 'Pending' },
  { id: '3', patient: 'Abebe Kidane', date: '2025-08-12', outcome: 'Successful' },
];

export default function CompletedSurgeriesScreen() {
  const [query, setQuery] = useState('');

  const filtered = DUMMY.filter((d) => d.patient.toLowerCase().includes(query.toLowerCase()));

  return (
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
        </View>
      </View>
    </SafeAreaView>
  );
}

// styling moved to commonStyles
