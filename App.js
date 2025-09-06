import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from './src/context/CartContext';
import { OrderHistoryProvider } from './src/context/OrderHistoryContext';
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    await Font.loadAsync({
      "OpenSans-Regular": require("./assets/fonts/open-sans.regular.ttf"),
      "OpenSans-Bold": require("./assets/fonts/open-sans.bold.ttf"),
    });
    setFontsLoaded(true);
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
     <AuthProvider>
    <CartProvider>
      <OrderHistoryProvider>
        <ThemeProvider>
          <AppNavigator />
          <StatusBar style="light" />
        </ThemeProvider>
      </OrderHistoryProvider>
    </CartProvider>
  </AuthProvider>
  );
}
