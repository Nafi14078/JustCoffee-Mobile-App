import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout, isLoading } = useAuth();

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
            const result = await logout();
            if (result.success) {
              // Navigation will be handled automatically by AppNavigator
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Help'),
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#a9745b" />
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

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={22} color="#a9745b" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#bdbdbd" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoading}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    color: '#a9745b',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
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
