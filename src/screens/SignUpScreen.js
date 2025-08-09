import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const animationRef = useRef(null);

  const onSignUp = () => {
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with animation and title */}
        <View style={styles.headerContainer}>
          <LottieView
            ref={animationRef}
            source={require('../../assets/animations/coffee-animation.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.title}>Create Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
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
          <TouchableOpacity
            onPress={onSignUp}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text
          style={styles.footerText}
          onPress={() => navigation.replace('Login')}
        >
          Already have an account?{' '}
          <Text style={styles.signupText}>Login</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  lottieAnimation: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 26,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: '#d7cec7',
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'OpenSans-Regular',
    shadowColor: '#a9745b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5.3,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#a9745b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a9745b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5.3,
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'OpenSans-Bold',
  },
  footerText: {
    marginTop: 20,
    color: '#d7cec7',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  signupText: {
    color: '#a9745b',
    fontWeight: '600',
  },
});
