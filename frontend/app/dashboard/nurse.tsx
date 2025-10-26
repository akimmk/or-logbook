import { useRouter } from 'expo-router';
import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import cs from './commonStyles';

export default function NurseDashboardScreen() {
  const router = useRouter();

  function handleSignOut() {
    console.log('handleSignOut pressed');
    router.push('/login');
  }

  return (
    <ProtectedRoute requiredRole="nurse">
      <SafeAreaView style={cs.safe}>
        <View style={cs.pageContainer}>
          <View style={cs.content}>
          <View style={cs.headerRow}>
            <View style={cs.headerLeft}>
              <Title style={cs.title}>Nurse Dashboard</Title>
              <Text style={cs.subtitle}>Welcome</Text>
            </View>

            <View style={cs.headerRight}>
              <Button compact onPress={() => router.push('/dashboard/profile')}>Profile</Button>
              <Button compact onPress={handleSignOut}>Sign Out</Button>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
            <TouchableOpacity
              style={cs.centeredCard}
              activeOpacity={0.8}
              onPress={() => router.push('/dashboard/scheduled-surgeries')}
            >
              <Text style={cs.cardTitle}>Total Surgeries Scheduled</Text>
              <Text style={cs.cardSubtitle}>View upcoming surgeries</Text>
              <Text style={cs.cardNumber}>5 scheduled</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={cs.centeredCard}
              activeOpacity={0.8}
              onPress={() => router.push('/dashboard/completed-surgeries')}
            >
              <Text style={cs.cardTitle}>Completed Surgeries Log</Text>
              <Text style={cs.cardSubtitle}>View past operations and search patients</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={cs.centeredCard}
              activeOpacity={0.8}
              onPress={() => router.push('/dashboard/add-patient')}
            >
              <Text style={cs.cardTitle}>Add New Surgery Record</Text>
              <Text style={cs.cardSubtitle}>Register a new patient for surgery</Text>
            </TouchableOpacity>
          </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

// uses shared styles from commonStyles.ts
