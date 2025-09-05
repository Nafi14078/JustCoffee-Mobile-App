import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Manage Products */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductCreate')}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.buttonText}>Create New Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Ionicons name="list" size={24} color="#fff" />
        <Text style={styles.buttonText}>View / Edit Products</Text>
      </TouchableOpacity>

      {/* View All Users button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UsersList')}  // Ensure this matches your navigator
      >
        <Ionicons name="people" size={24} color="#fff" />
        <Text style={styles.buttonText}>View All Users</Text>
      </TouchableOpacity>

      {/* Placeholder: Orders */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrdersList')}
      >
        <Ionicons name="receipt" size={24} color="#fff" />
        <Text style={styles.buttonText}>View Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#a9745a',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#a9745a',
    marginVertical: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});