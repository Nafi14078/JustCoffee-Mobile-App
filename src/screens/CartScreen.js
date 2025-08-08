import { StyleSheet, Text, View } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart functionality coming soon!</Text>
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
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    color: '#a9745b',
  },
});
