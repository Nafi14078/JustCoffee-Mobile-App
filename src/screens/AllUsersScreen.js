import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const API_BASE_URL = 'http://10.183.115.115:5000/api/users'; // Your users API endpoint

export default function AllUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setUsers(data); // expect array of users
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 1 ? styles.rowAlt : null]}>
      <Text style={[styles.cell, styles.cellIndex]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
      <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.cellIndex, styles.headerCell]}>#</Text>
        <Text style={[styles.cell, styles.cellName, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.cellEmail, styles.headerCell]}>Email</Text>
      </View>

      {/* Users list */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  rowAlt: {
    backgroundColor: '#2c2c2c',
  },
  headerRow: {
    borderBottomWidth: 2,
    borderColor: '#a9745b',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#a9745b',
  },
  cell: {
    color: '#fff',
    fontSize: 16,
  },
  cellIndex: {
    flex: 0.5,
  },
  cellName: {
    flex: 2,
  },
  cellEmail: {
    flex: 3,
  },
});
