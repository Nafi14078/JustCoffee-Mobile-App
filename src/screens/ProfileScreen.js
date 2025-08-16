import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigation handled by AppNavigator/context
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color="#a9745b" />
        </View>
      </View>

      {/* User Information */}
      {user && (
        <View style={styles.userInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#a9745b" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#a9745b" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#a9745b" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Member Since</Text>
              <Text style={styles.value}>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Main Menu Options */}
      <View style={styles.menuContainer}>
        {/* Conditional button for Order History or Admin Dashboard */}
        {user && user.role === 'admin' ? (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminDashboard')}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#a9745b" />
            <Text style={styles.menuText}>Admin Dashboard</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Ionicons name="reader-outline" size={20} color="#a9745b" />
            <Text style={styles.menuText}>Order History</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        )}

        {/* Settings menu - common for all */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={20} color="#a9745b" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    color: '#a9745b',
    textAlign: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#a9745b',
  },
  userInfo: {
    backgroundColor: '#2c2c2c',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
  },
  menuContainer: {
    backgroundColor: '#2c2c2c',
    borderRadius: 15,
    padding: 5,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3c3c3c',
  },
  menuText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#a9745b',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
});
