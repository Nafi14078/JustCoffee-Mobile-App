import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const animationRef = useRef(null);

  const { register, isLoading, error, clearError } = useAuth();

  const onSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    clearError();
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (result.success) {
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    } else {
      Alert.alert("Registration Failed", result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with animation and title */}
        <View style={styles.headerContainer}>
          <LottieView
            ref={animationRef}
            source={require("../../assets/animations/coffee-animation.json")}
            style={styles.lottieAnimation}
            autoPlay
            loop
          />
          <Text style={styles.title}>Create Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={onSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          disabled={isLoading}
        >
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.signupText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  lottieAnimation: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "OpenSans-Bold",
    color: "#a9745b",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 26,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#d7cec7",
    fontSize: 16,
    marginBottom: 12,
    fontFamily: "OpenSans-Regular",
    shadowColor: "#a9745b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5.3,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#a9745b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#a9745b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5.3,
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    fontFamily: "OpenSans-Bold",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  footerText: {
    marginTop: 20,
    color: "#d7cec7",
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  signupText: {
    color: "#a9745b",
    fontWeight: "600",
  },
});
