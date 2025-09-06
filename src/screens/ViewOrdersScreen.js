import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderHistory } from '../context/OrderHistoryContext';

export default function OrderHistoryScreen() {
  const { orders } = useOrderHistory();

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id.slice(-6)}</Text>
        <Text style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderItems}>{item.items.length} items</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={[styles.orderStatus, 
          item.status === 'completed' ? styles.statusCompleted : styles.statusPending
        ]}>
          {item.status}
        </Text>
        <TouchableOpacity style={styles.viewDetailsBtn}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#a9745b" />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>Your orders will appear here</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#888',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderItems: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#ccc',
  },
  orderTotal: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  statusPending: {
    backgroundColor: '#FF9800',
    color: '#fff',
  },
  viewDetailsBtn: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
});