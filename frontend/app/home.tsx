import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Button, Text, Title, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  // animated values
  const pulse = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 900, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulse, { toValue: 1.0, duration: 900, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -8, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(floatY, { toValue: 0, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );

    pulseAnim.start();
    floatAnim.start();
    return () => {
      pulseAnim.stop();
      floatAnim.stop();
    };
  }, [pulse, floatY]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}> 
      <Animated.View style={[styles.logoWrap, { transform: [{ scale: pulse }, { translateY: floatY }] }]}
        accessibilityRole="image"
        accessibilityLabel="medical-logo"
      >
        <View style={styles.crossVertical} />
        <View style={styles.crossHorizontal} />
        <View style={styles.dot} />
      </Animated.View>

      <Title style={styles.title}>OR Logbook</Title>
      <Text style={styles.subtitle}>
        A lightweight surgical logbook built for medical teams — track procedures, outcomes and notes securely.
      </Text>

      <Button
        mode="contained"
        onPress={() => router.push('/login')}
        style={[styles.cta, { backgroundColor: theme.colors.primary }]}
        accessibilityLabel="get-started"
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoWrap: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  crossVertical: {
    position: 'absolute',
    width: 18,
    height: 52,
    backgroundColor: '#1976D2',
    borderRadius: 6,
  },
  crossHorizontal: {
    position: 'absolute',
    height: 18,
    width: 52,
    backgroundColor: '#1976D2',
    borderRadius: 6,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0288D1',
    bottom: 10,
  },
  title: {
    fontSize: 26,
    marginTop: 6,
    marginBottom: 8,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 22,
  },
  cta: {
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
