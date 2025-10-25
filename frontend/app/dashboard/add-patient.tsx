import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Platform } from 'react-native';
import cs from './commonStyles';
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
    // TODO: wire to Firestore
  }

  return (
    <SafeAreaView style={cs.safe}>
      <ScrollView contentContainerStyle={cs.pageContainer}>
        <View style={cs.content}>
          <Title>New Surgery Record</Title>

          <View style={cs.section}>
            <Text style={cs.sectionTitle}>Patient Details</Text>
            <Text style={cs.label}>Full Name *</Text>
            <TextInput placeholder="e.g. John Doe" value={fullName} onChangeText={setFullName} style={cs.input} />

            <Text style={cs.label}>Patient ID *</Text>
            <TextInput placeholder="e.g. P-12345" value={patientId} onChangeText={setPatientId} style={cs.input} />

            <Text style={cs.label}>Age</Text>
            <TextInput placeholder="e.g. 45" value={age} onChangeText={setAge} style={cs.input} keyboardType="numeric" />

            <Text style={cs.label}>Sex</Text>
            <TextInput placeholder="e.g. Male" value={sex} onChangeText={setSex} style={cs.input} />

            <Text style={cs.label}>Bed Number</Text>
            <TextInput placeholder="e.g. 101A" value={bed} onChangeText={setBed} style={cs.input} />

            <Text style={cs.label}>Ward</Text>
            <TextInput placeholder="e.g. General Surgery" value={ward} onChangeText={setWard} style={cs.input} />
          </View>

          <View style={cs.section}>
            <Text style={cs.sectionTitle}>Surgery Details</Text>

            <Text style={cs.label}>Surgery Date *</Text>
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

            <Text style={[cs.label, { marginTop: 8 }]}>Start Time *</Text>
            <Button
              mode="outlined"
              onPress={() => {
                if (Platform.OS === 'web') {
                  const v = window.prompt('Enter start time (HH:MM, 24h)', startTime === 'Start' ? '' : startTime);
                  if (v) {
                    const [hh, mm] = v.split(':').map(Number);
                    const d = new Date();
                    d.setHours(hh ?? 0, mm ?? 0, 0, 0);
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

            <Text style={[cs.label, { marginTop: 8 }]}>End Time *</Text>
            <Button
              mode="outlined"
              onPress={() => {
                if (Platform.OS === 'web') {
                  const v = window.prompt('Enter end time (HH:MM, 24h)', endTime === 'End' ? '' : endTime);
                  if (v) {
                    const [hh, mm] = v.split(':').map(Number);
                    const d = new Date();
                    d.setHours(hh ?? 0, mm ?? 0, 0, 0);
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

            <Text style={cs.label}>Anesthesia Type *</Text>
            <TextInput placeholder="e.g. General" value={anesthesia} onChangeText={setAnesthesia} style={cs.input} />

            <Text style={cs.label}>Procedure Performed *</Text>
            <TextInput placeholder="e.g. Appendectomy" value={procedure} onChangeText={setProcedure} style={cs.input} />

            <Text style={cs.label}>Pre-Op Diagnosis *</Text>
            <TextInput placeholder="e.g. Acute appendicitis" value={preOp} onChangeText={setPreOp} style={cs.input} />

            <Text style={cs.label}>Post-Op Diagnosis</Text>
            <TextInput placeholder="e.g. N/A" value={postOp} onChangeText={setPostOp} style={cs.input} />
          </View>

          <View style={cs.section}>
            <Text style={cs.sectionTitle}>Surgical Team</Text>
            <Text style={cs.label}>Surgeon Name *</Text>
            <TextInput placeholder="e.g. Dr. Tesfaye" value={surgeon} onChangeText={setSurgeon} style={cs.input} />

            <Text style={cs.label}>Assistants (comma-separated)</Text>
            <TextInput placeholder="e.g. Nurse A, Nurse B" value={assistants} onChangeText={setAssistants} style={cs.input} />

            <Text style={cs.label}>Anesthetist</Text>
            <TextInput placeholder="e.g. Dr. Alem" value={anesthetist} onChangeText={setAnesthetist} style={cs.input} />

            <Text style={cs.label}>Scrub Nurse</Text>
            <TextInput placeholder="e.g. Nurse Selam" value={scrub} onChangeText={setScrub} style={cs.input} />

            <Text style={cs.label}>Circulating Nurse</Text>
            <TextInput placeholder="e.g. Nurse Hana" value={circulating} onChangeText={setCirculating} style={cs.input} />
          </View>

          <View style={cs.section}>
            <Text style={cs.sectionTitle}>Outcome</Text>
            <Text style={cs.label}>Outcome *</Text>
            <TextInput placeholder="e.g. Successful" value={outcome} onChangeText={setOutcome} style={cs.input} />

            <Text style={cs.label}>Complications</Text>
            <TextInput placeholder="e.g. None" value={complications} onChangeText={setComplications} style={[cs.input, { height: 90, textAlignVertical: 'top' }]} multiline />

            <Text style={cs.label}>Remarks</Text>
            <TextInput placeholder="e.g. Patient stable" value={remarks} onChangeText={setRemarks} style={[cs.input, { height: 90, textAlignVertical: 'top' }]} multiline />
          </View>

          <View style={cs.actionsRow}>
            <Button mode="contained" onPress={handleSave} style={{ marginBottom: 8 }}>Save</Button>
            <Button mode="outlined" onPress={() => router.back()}>Cancel</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
