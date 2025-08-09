import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Floating coffee cup + steam animation
function InteractiveCoffeeIcon() {
  const steamAnim = useRef(new Animated.Value(0)).current;

  const animateSteam = () => {
    Animated.sequence([
      Animated.timing(steamAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(steamAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={animateSteam} style={styles.floatingCoffeeIcon}>
      <MaterialCommunityIcons name="coffee-outline" size={72} color="#a9745b" />
      <Animated.View
        style={[
          styles.steam,
          { transform: [{ translateY: steamAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -24] }) }] }
        ]}
      >
        <MaterialCommunityIcons name="weather-windy" size={40} color="#d7cec7" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <InteractiveCoffeeIcon />

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

      <Text style={styles.footerText} onPress={() => alert('Signup flow not implemented')}>
        Don’t have an account? <Text style={styles.signupText}>Sign up</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  floatingCoffeeIcon: {
    position: 'absolute',
    top: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  steam: {
    position: 'absolute',
    top: -20,
    left: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    marginBottom: 48,
    marginTop: 100,
    textAlign: 'center',
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
