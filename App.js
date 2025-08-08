import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import { View, ActivityIndicator } from "react-native";

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
        }}
      >
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}
