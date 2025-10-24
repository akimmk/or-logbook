import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, Platform } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [surgeryDateObj, setSurgeryDateObj] = useState<Date | null>(null);
  const [startTimeObj, setStartTimeObj] = useState<Date | null>(null);
  const [endTimeObj, setEndTimeObj] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
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
      surgeryDate: surgeryDateObj ? surgeryDateObj.toISOString() : surgeryDate,
      startTime: startTimeObj ? startTimeObj.toISOString() : startTime,
      endTime: endTimeObj ? endTimeObj.toISOString() : endTime,
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
          <Text style={styles.label}>Full Name *</Text>
          <TextInput placeholder="e.g. John Doe" value={fullName} onChangeText={setFullName} style={styles.input} />

          <Text style={styles.label}>Patient ID *</Text>
          <TextInput placeholder="e.g. P-12345" value={patientId} onChangeText={setPatientId} style={styles.input} />

          <Text style={styles.label}>Age</Text>
          <TextInput placeholder="e.g. 45" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />

          <Text style={styles.label}>Sex</Text>
          <TextInput placeholder="e.g. Male" value={sex} onChangeText={setSex} style={styles.input} />

          <Text style={styles.label}>Bed Number</Text>
          <TextInput placeholder="e.g. 101A" value={bed} onChangeText={setBed} style={styles.input} />

          <Text style={styles.label}>Ward</Text>
          <TextInput placeholder="e.g. General Surgery" value={ward} onChangeText={setWard} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Surgery Details</Text>
          <Text style={styles.label}>Surgery Date *</Text>
          <Button
            mode="outlined"
            onPress={() => {
              if (Platform.OS === 'web') {
                const v = window.prompt('Enter surgery date (YYYY-MM-DD)', surgeryDate === 'Select date' ? '' : surgeryDate);
                if (v) {
                  const d = new Date(v);
                  if (!isNaN(d.getTime())) {
                    setSurgeryDateObj(d);
                    setSurgeryDate(d.toLocaleDateString());
                  }
                }
              } else {
                setShowDatePicker(true);
              }
            }}
          >
            {surgeryDateObj ? surgeryDateObj.toLocaleDateString() : surgeryDate}
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={surgeryDateObj || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setSurgeryDateObj(selectedDate);
                  setSurgeryDate(selectedDate.toLocaleDateString());
                }
              }}
            />
          )}

          <Text style={[styles.label, { marginTop: 8 }]}>Start Time *</Text>
          <Button
            mode="outlined"
            onPress={() => {
              if (Platform.OS === 'web') {
                const v = window.prompt('Enter start time (HH:MM, 24h)', startTime === 'Start' ? '' : startTime);
                if (v) {
                  const [hh, mm] = v.split(':').map(Number);
                  const d = new Date(); d.setHours(hh ?? 0, mm ?? 0, 0, 0);
                  setStartTimeObj(d);
                  setStartTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
              } else {
                setShowStartPicker(true);
              }
            }}
          >
            {startTimeObj ? startTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : startTime}
          </Button>

          {showStartPicker && (
            <DateTimePicker
              value={startTimeObj || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowStartPicker(false);
                if (selectedTime) {
                  setStartTimeObj(selectedTime);
                  setStartTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
              }}
            />
          )}

          <Text style={[styles.label, { marginTop: 8 }]}>End Time *</Text>
          <Button
            mode="outlined"
            onPress={() => {
              if (Platform.OS === 'web') {
                const v = window.prompt('Enter end time (HH:MM, 24h)', endTime === 'End' ? '' : endTime);
                if (v) {
                  const [hh, mm] = v.split(':').map(Number);
                  const d = new Date(); d.setHours(hh ?? 0, mm ?? 0, 0, 0);
                  setEndTimeObj(d);
                  setEndTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
              } else {
                setShowEndPicker(true);
              }
            }}
          >
            {endTimeObj ? endTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : endTime}
          </Button>

          {showEndPicker && (
            <DateTimePicker
              value={endTimeObj || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowEndPicker(false);
                if (selectedTime) {
                  setEndTimeObj(selectedTime);
                  setEndTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
              }}
            />
          )}

          <Text style={styles.label}>Anesthesia Type *</Text>
          <TextInput placeholder="e.g. General" value={anesthesia} onChangeText={setAnesthesia} style={styles.input} />

          <Text style={styles.label}>Procedure Performed *</Text>
          <TextInput placeholder="e.g. Appendectomy" value={procedure} onChangeText={setProcedure} style={styles.input} />

          <Text style={styles.label}>Pre-Op Diagnosis *</Text>
          <TextInput placeholder="e.g. Acute appendicitis" value={preOp} onChangeText={setPreOp} style={styles.input} />

          <Text style={styles.label}>Post-Op Diagnosis</Text>
          <TextInput placeholder="e.g. N/A" value={postOp} onChangeText={setPostOp} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Surgical Team</Text>
          <Text style={styles.label}>Surgeon Name *</Text>
          <TextInput placeholder="e.g. Dr. Tesfaye" value={surgeon} onChangeText={setSurgeon} style={styles.input} />

          <Text style={styles.label}>Assistants (comma-separated)</Text>
          <TextInput placeholder="e.g. Nurse A, Nurse B" value={assistants} onChangeText={setAssistants} style={styles.input} />

          <Text style={styles.label}>Anesthetist</Text>
          <TextInput placeholder="e.g. Dr. Alem" value={anesthetist} onChangeText={setAnesthetist} style={styles.input} />

          <Text style={styles.label}>Scrub Nurse</Text>
          <TextInput placeholder="e.g. Nurse Selam" value={scrub} onChangeText={setScrub} style={styles.input} />

          <Text style={styles.label}>Circulating Nurse</Text>
          <TextInput placeholder="e.g. Nurse Hana" value={circulating} onChangeText={setCirculating} style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outcome</Text>
          <Text style={styles.label}>Outcome *</Text>
          <TextInput placeholder="e.g. Successful" value={outcome} onChangeText={setOutcome} style={styles.input} />

          <Text style={styles.label}>Complications</Text>
          <TextInput placeholder="e.g. None" value={complications} onChangeText={setComplications} style={[styles.input, styles.multiline]} multiline />

          <Text style={styles.label}>Remarks</Text>
          <TextInput placeholder="e.g. Patient stable" value={remarks} onChangeText={setRemarks} style={[styles.input, styles.multiline]} multiline />
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
  label: { fontWeight: '700', marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#e6e6e6', padding: 8, borderRadius: 6, marginBottom: 8 },
  multiline: { height: 90, textAlignVertical: 'top' },
  actions: { marginTop: 12 },
});
