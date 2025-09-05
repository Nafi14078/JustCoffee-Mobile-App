import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </ThemeProvider>
    </AuthProvider>
  );

}