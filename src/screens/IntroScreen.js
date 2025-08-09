import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function IntroScreen({ navigation }) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3500); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('../../assets/animations/coffee-intro.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.title}>JustCoffee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 24,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#a9745b', 
    fontFamily: 'OpenSans-Bold',
  },
});
