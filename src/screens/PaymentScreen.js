import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useOrderHistory } from '../context/OrderHistoryContext';

export default function PaymentScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { total, cartItems } = route.params;
  const { clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const processPayment = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order details
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cartItems,
        total: total,
        status: 'completed',
        paymentMethod: paymentMethod
      };
      
      // Add to order history
      addOrder(order);
      
      // Clear cart
      clearCart();
      
      // Show success message
      Alert.alert(
        'Payment Successful!',
        'Your order has been placed successfully.',
        [
          {
            text: 'View Orders',
            onPress: () => navigation.navigate('OrderHistory')
          },
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Payment</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total</Text>
            <Text style={styles.summaryValue}>${(total - 2.99).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$2.99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('card')}
          >
            <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'paypal' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('paypal')}
          >
            <Text style={styles.paymentOptionText}>PayPal</Text>
          </TouchableOpacity>
        </View>

        {paymentMethod === 'card' && (
          <View style={styles.cardForm}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            {/* In a real app, you would integrate Braintree Drop-in UI here */}
            <View style={styles.cardInput}>
              <Text style={styles.cardPlaceholder}>Card Number: 4242 4242 4242 4242</Text>
            </View>
            <View style={styles.cardRow}>
              <View style={[styles.cardInput, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.cardPlaceholder}>MM/YY</Text>
              </View>
              <View style={[styles.cardInput, { flex: 1 }]}>
                <Text style={styles.cardPlaceholder}>CVV</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={processPayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay ${total.toFixed(2)}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  summaryCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#ccc',
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#fff',
  },
  total: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
  },
  paymentMethods: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  paymentOption: {
    backgroundColor: '#2c2c2c',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    borderColor: '#a9745b',
    backgroundColor: '#3a3a3a',
  },
  paymentOptionText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#fff',
  },
  cardForm: {
    marginBottom: 24,
  },
  cardInput: {
    backgroundColor: '#2c2c2c',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  cardPlaceholder: {
    color: '#888',
    fontFamily: 'OpenSans-Regular',
  },
  cardRow: {
    flexDirection: 'row',
  },
  payButton: {
    backgroundColor: '#a9745b',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonDisabled: {
    backgroundColor: '#7a5b4a',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
});