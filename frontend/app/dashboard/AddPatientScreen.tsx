import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, Platform } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function AddPatientScreen() {
  const router = useRouter();

  // Patient Details
  const [fullName, setFullName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Male');
  const [bed, setBed] = useState('');
  const [ward, setWard] = useState('');

  // Surgery Details
  const [surgeryDate, setSurgeryDate] = useState('Select date');
  const [startTime, setStartTime] = useState('Start');
  const [endTime, setEndTime] = useState('End');
  const [anesthesia, setAnesthesia] = useState('General');
  const [procedure, setProcedure] = useState('');
  const [preOp, setPreOp] = useState('');
  const [postOp, setPostOp] = useState('');

  // Surgical Team
  const [surgeon, setSurgeon] = useState('');
  const [assistants, setAssistants] = useState('');
  const [anesthetist, setAnesthetist] = useState('');
  const [scrub, setScrub] = useState('');
  const [circulating, setCirculating] = useState('');

  // Outcome
  const [outcome, setOutcome] = useState('Successful');
  const [complications, setComplications] = useState('');
  const [remarks, setRemarks] = useState('');

  function handleSave() {
    const payload = {
      fullName,
      patientId,
      age,
      sex,
      bed,
      ward,
      surgeryDate,
      startTime,
      endTime,
      anesthesia,
      procedure,
      preOp,
      postOp,
      surgeon,
      assistants,
      anesthetist,
      scrub,
      circulating,
      outcome,
      complications,
      remarks,
    };
    console.log('Save payload:', payload);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title>New Surgery Record</Title>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Details</Text>
          <TextInput placeholder="Full Name*" value={fullName} onChangeText={setFullName} style={styles.input} />
          <TextInput placeholder="Patient ID*" value={patientId} onChangeText={setPatientId} style={styles.input} />
          <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Sex (Male/Female/Other)" value={sex} onChangeText={setSex} style={styles.input} />
          <TextInput placeholder="Bed Number" value={bed} onChangeText={setBed} style={styles.input} />
          <TextInput placeholder="Ward" value={ward} onChangeText={setWard} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Surgery Details</Text>
          <Button mode="outlined" onPress={() => setSurgeryDate('2025-10-22')}>{surgeryDate}</Button>
          <Button mode="outlined" onPress={() => setStartTime('09:00')}>Start: {startTime}</Button>
          <Button mode="outlined" onPress={() => setEndTime('10:30')}>End: {endTime}</Button>
          <TextInput placeholder="Anesthesia Type" value={anesthesia} onChangeText={setAnesthesia} style={styles.input} />
          <TextInput placeholder="Procedure Performed*" value={procedure} onChangeText={setProcedure} style={styles.input} />
          <TextInput placeholder="Pre-Op Diagnosis*" value={preOp} onChangeText={setPreOp} style={styles.input} />
          <TextInput placeholder="Post-Op Diagnosis" value={postOp} onChangeText={setPostOp} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Surgical Team</Text>
          <TextInput placeholder="Surgeon Name*" value={surgeon} onChangeText={setSurgeon} style={styles.input} />
          <TextInput placeholder="Assistants (comma-separated)" value={assistants} onChangeText={setAssistants} style={styles.input} />
          <TextInput placeholder="Anesthetist" value={anesthetist} onChangeText={setAnesthetist} style={styles.input} />
          <TextInput placeholder="Scrub Nurse" value={scrub} onChangeText={setScrub} style={styles.input} />
          <TextInput placeholder="Circulating Nurse" value={circulating} onChangeText={setCirculating} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outcome</Text>
          <TextInput placeholder="Outcome" value={outcome} onChangeText={setOutcome} style={styles.input} />
          <TextInput placeholder="Complications" value={complications} onChangeText={setComplications} style={[styles.input, styles.multiline]} multiline />
          <TextInput placeholder="Remarks" value={remarks} onChangeText={setRemarks} style={[styles.input, styles.multiline]} multiline />
        </View>

        <View style={styles.actions}>
          <Button mode="contained" onPress={handleSave} style={{ marginBottom: 8 }}>Save</Button>
          <Button mode="outlined" onPress={() => router.back()}>Cancel</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  section: { backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginVertical: 8 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e6e6e6', padding: 8, borderRadius: 6, marginBottom: 8 },
  multiline: { height: 90, textAlignVertical: 'top' },
  actions: { marginTop: 12 },
});
