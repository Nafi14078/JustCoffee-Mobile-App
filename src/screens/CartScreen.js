import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Add this import
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigation = useNavigation(); // Add this line

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is empty. Add some items first!');
      return;
    }
    
    // Navigate to Payment Screen instead of showing alert
    navigation.navigate('Payment', {
      total: getTotalPrice() + 2.99,
      cartItems: cart.items
    });
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.product.imageUrl }} 
        style={styles.itemImage}
        defaultSource={require('../../assets/images/user.jpg')}
      />
      
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          onPress={() => handleQuantityChange(item.product._id, item.size, item.quantity - 1)}
          style={styles.quantityBtn}
        >
          <Ionicons name="remove" size={24} color="#a9745b" />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity 
          onPress={() => handleQuantityChange(item.product._id, item.size, item.quantity + 1)}
          style={styles.quantityBtn}
        >
          <Ionicons name="add" size={24} color="#a9745b" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTotal}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </Text>
      
      <TouchableOpacity 
        onPress={() => removeFromCart(item.product._id, item.size)}
        style={styles.removeBtn}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#a9745b" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add some delicious coffee to get started!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.itemsContainer}>
          <FlatList
            data={cart.items}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => `${item.product._id}-${item.size}-${index}`}
            scrollEnabled={false}
          />
        </ScrollView>
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$2.99</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.totalPrice}>${(getTotalPrice() + 2.99).toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#1E1E1E',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  emptyText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: '#a9745b',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  itemsContainer: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    height: 100,
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  quantityBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 15,
    minWidth: 25,
    textAlign: 'center',
  },
  itemTotal: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#a9745b',
    marginRight: 5,
    flex: 1,
    textAlign: 'center',
    minWidth: 70,
  },
  removeBtn: {
    padding: 5,
    backgroundColor: '#ff4444',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#2c2c2c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#ccc',
  },
  summaryValue: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#fff',
  },
  totalPrice: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#a9745b',
  },
  checkoutBtn: {
    backgroundColor: '#a9745b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
  },
});