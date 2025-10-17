import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, Title, useTheme } from 'react-native-paper';

interface AuthForm {
  fullname?: string;
  email: string;
  password: string;
}

export default function LoginScreen() {
  const theme = useTheme();
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<'admin' | 'surgeon' | 'nurse'>('surgeon');
  const router = useRouter();
  const {
    control,
    handleSubmit,
  formState: { errors },
  } = useForm<AuthForm>({ mode: 'onChange', defaultValues: { fullname: '', email: '', password: '' } });

  // For now, accept any string values and don't save data. Navigate to the selected role dashboard.
  const onSubmit = (_data: AuthForm) => {
    // navigate to role dashboard via explicit mapping (satisfy typed router paths)
    const path = role === 'admin' ? '/dashboard/admin' : role === 'surgeon' ? '/dashboard/surgeon' : '/dashboard/nurse';
    router.push(path as any);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 60 })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>{isSignup ? 'Sign Up' : 'Sign In'}</Title>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            {isSignup ? (
              <>
                <Controller
                  control={control}
                  name="fullname"
                  rules={{ required: 'Full name is required', minLength: { value: 2, message: 'Enter a full name' } }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Full Name"
                      mode="outlined"
                      dense
                      placeholder="Enter your full name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.input}
                    />
                  )}
                />
                {errors.fullname && <Text style={styles.errorText}>{errors.fullname.message}</Text>}

                {/* When signing up we show Full Name first, then Email. For now we don't enforce validation rules. */}
                {isSignup ? (
                  <>
                    <Controller
                      control={control}
                      name="fullname"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          label="Full Name"
                          mode="outlined"
                          dense
                          placeholder="Enter your full name"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          label="Email"
                          mode="outlined"
                          dense
                          placeholder="Enter your email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      )}
                    />
                  </>
                ) : (
                  <>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          label="Email"
                          mode="outlined"
                          dense
                          placeholder="Enter your email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      )}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Email"
                      mode="outlined"
                      dense
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.input}
                    />
                  )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  mode="outlined"
                  dense
                  placeholder="Enter your password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />

            <View style={styles.roleRow}>
              <Button mode={role === 'admin' ? 'contained' : 'outlined'} onPress={() => setRole('admin')} style={styles.roleButton}>Admin</Button>
              <Button mode={role === 'surgeon' ? 'contained' : 'outlined'} onPress={() => setRole('surgeon')} style={styles.roleButton}>Surgeon</Button>
              <Button mode={role === 'nurse' ? 'contained' : 'outlined'} onPress={() => setRole('nurse')} style={styles.roleButton}>Nurse</Button>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              accessibilityLabel="auth-submit"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button
              mode="text"
              onPress={() => setIsSignup(!isSignup)}
              style={styles.switchButton}
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginVertical: 8,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 4,
    backgroundColor: '#F6F8FF',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  actionButton: {
    marginTop: 12,
  },
  switchButton: {
    marginTop: 8,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  errorText: {
    color: '#B00020',
    marginBottom: 8,
  },
});
