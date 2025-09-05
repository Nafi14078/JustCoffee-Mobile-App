import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const navigation = useNavigation();

  const faqItems = [
    {
      question: 'How do I track my order?',
      answer: 'Once your order is placed, you will receive an email with tracking details. You can also check your order status in the app.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 15-30 minutes depending on your location and current order volume.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'Orders can be modified within 2 minutes of placing. After that, please contact our support team.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer full refunds for cancelled orders and quality issues. Contact support for assistance.',
    },
  ];

  const contactOptions = [
    {
      title: 'Email Support',
      subtitle: 'support@justcoffee.com',
      icon: 'mail-outline',
      onPress: () => Linking.openURL('mailto:support@justcoffee.com'),
    },
    {
      title: 'Call Us',
      subtitle: '+1 (555) 123-4567',
      icon: 'call-outline',
      onPress: () => Linking.openURL('tel:+15551234567'),
    },
    {
      title: 'Live Chat',
      subtitle: 'Available 24/7',
      icon: 'chatbubble-outline',
      onPress: () => Alert.alert('Live Chat', 'Live chat feature coming soon!'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqItems.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}

        {/* Contact Section */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Contact Us</Text>
        {contactOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.contactItem} onPress={option.onPress}>
            <View style={styles.contactLeft}>
              <Ionicons name={option.icon} size={24} color="#a9745b" />
              <View style={styles.contactText}>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdbdbd" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  sectionTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#a9745b',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#23232b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  question: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  answer: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#bdbdbd',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#23232b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    marginLeft: 16,
  },
  contactTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#bdbdbd',
  },
});
