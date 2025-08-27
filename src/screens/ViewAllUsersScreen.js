import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { API_BASE_URL } from '../config';

const ViewAllUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getAuthToken = async () => {
    try {
      return 'your-auth-token';
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const fetchUsers = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch users');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const handleToggleAdmin = async (userId, isCurrentlyAdmin) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE_URL}/users/${userId}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAdmin: !isCurrentlyAdmin
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', `User ${!isCurrentlyAdmin ? 'promoted to' : 'demoted from'} admin successfully`);
        fetchUsers();
      } else {
        Alert.alert('Error', data.message || 'Failed to update user');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not update user');
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={[styles.userRole, {color: item.isAdmin ? '#a9745b' : '#666'}]}>
          {item.isAdmin ? 'Admin' : 'Customer'}
        </Text>
        <Text style={styles.userDate}>
          Joined: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity 
        style={[styles.toggleButton, {backgroundColor: item.isAdmin ? '#666' : '#a9745b'}]}
        onPress={() => handleToggleAdmin(item._id, item.isAdmin)}
      >
        <Ionicons 
          name={item.isAdmin ? 'remove-circle' : 'add-circle'} 
          size={20} 
          color="#fff" 
        />
        <Text style={styles.toggleButtonText}>
          {item.isAdmin ? 'Remove Admin' : 'Make Admin'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#a9745b" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View All Users</Text>
        <Text style={styles.userCount}>{users.length} users</Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#a9745b']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="people" size={64} color="#666" />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2c2c2c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a9745b',
  },
  userCount: {
    fontSize: 16,
    color: '#ccc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  userDate: {
    fontSize: 12,
    color: '#666',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    gap: 4,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 16,
  },
});

export default ViewAllUsersScreen;