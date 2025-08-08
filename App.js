import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to JustCoffee ☕️</Text>
        <Text style={styles.subtitle}>This is your main entry via App.js!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#a9745b',
    marginBottom:12,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
