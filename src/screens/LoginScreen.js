import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // For demo, press login to immediately go to main tabs
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>JustCoffee</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={onLogin} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText} onPress={() => alert('Signup flow not implemented')}>
        Don&apos;t have an account? Sign up
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    marginBottom: 48,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    backgroundColor: '#a9745b',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#a9745b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },
  signupText: {
    color: '#a9745b',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
});
