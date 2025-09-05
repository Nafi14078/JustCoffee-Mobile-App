import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function PaymentScreen() {
  const navigation = useNavigation();
  const { total, clearCart, items } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
    }

    Alert.alert(
      'Payment Successful!',
      `Your order of $${total.toFixed(2)} has been placed successfully. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
    { id: 'google', name: 'Google Pay', icon: 'logo-google' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Items ({items.length})</Text>
            <Text style={styles.summaryText}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery Fee</Text>
            <Text style={styles.summaryText}>$2.50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tax</Text>
            <Text style={styles.summaryText}>${(total * 0.1).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${(total + 2.5 + total * 0.1).toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[styles.paymentMethod, paymentMethod === method.id && styles.selectedMethod]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={styles.methodLeft}>
                <Ionicons name={method.icon} size={24} color="#a9745b" />
                <Text style={styles.methodName}>{method.name}</Text>
              </View>
              <View style={[styles.radio, paymentMethod === method.id && styles.radioSelected]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Card Holder Name"
              placeholderTextColor="#bdbdbd"
              value={cardHolder}
              onChangeText={setCardHolder}
            />

            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#bdbdbd"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="MM/YY"
                placeholderTextColor="#bdbdbd"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />

              <TextInput
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                placeholder="CVV"
                placeholderTextColor="#bdbdbd"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <Text style={styles.payBtnText}>
            Pay ${(total + 2.5 + total * 0.1).toFixed(2)}
          </Text>
          <Ionicons name="card-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#bdbdbd',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#2c2c2c',
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#a9745b',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#23232b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedMethod: {
    backgroundColor: '#2c2c2c',
    borderWidth: 2,
    borderColor: '#a9745b',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
  radioSelected: {
    borderColor: '#a9745b',
    backgroundColor: '#a9745b',
  },
  input: {
    backgroundColor: '#23232b',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  payBtn: {
    backgroundColor: '#a9745b',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a9745b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  payBtnText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#fff',
    marginRight: 8,
  },
});
