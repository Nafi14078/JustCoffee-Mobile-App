import { MaterialIcons } from '@expo/vector-icons';
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

const ViewOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
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

  const fetchOrders = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', `Order status updated to ${newStatus}`);
        fetchOrders();
      } else {
        Alert.alert('Error', data.message || 'Failed to update order status');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'confirmed': return '#2196F3';
      case 'preparing': return '#9C27B0';
      case 'ready': return '#4CAF50';
      case 'completed': return '#607D8B';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
        <Text style={[styles.orderStatus, {color: getStatusColor(item.status)}]}>
          {item.status?.toUpperCase()}
        </Text>
      </View>
      
      <Text style={styles.customerInfo}>{item.user?.name} - {item.user?.email}</Text>
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderTotal}>Total: ${item.totalAmount?.toFixed(2)}</Text>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>

      <Text style={styles.itemsTitle}>Items ({item.items?.length || 0}):</Text>
      {item.items?.map((item, index) => (
        <Text key={index} style={styles.orderItem}>
          • {item.quantity}x {item.product?.name} - ${item.price?.toFixed(2)}
        </Text>
      ))}

      <View style={styles.statusActions}>
        {['pending', 'confirmed', 'preparing', 'ready'].includes(item.status) && (
          <>
            <TouchableOpacity 
              style={[styles.statusButton, {backgroundColor: '#4CAF50'}]}
              onPress={() => handleUpdateStatus(item._id, 'completed')}
            >
              <Text style={styles.statusButtonText}>Complete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.statusButton, {backgroundColor: '#f44336'}]}
              onPress={() => handleUpdateStatus(item._id, 'cancelled')}
            >
              <Text style={styles.statusButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#a9745b" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View Orders</Text>
        <Text style={styles.orderCount}>{orders.length} orders</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
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
            <MaterialIcons name="receipt" size={64} color="#666" />
            <Text style={styles.emptyText}>No orders found</Text>
            <Text style={styles.emptySubtext}>Orders will appear here</Text>
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
  orderCount: {
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
  orderCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  customerInfo: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a9745b',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    marginTop: 8,
  },
  orderItem: {
    fontSize: 12,
    color: '#ccc',
    marginLeft: 8,
  },
  statusActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusButtonText: {
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ViewOrdersScreen;