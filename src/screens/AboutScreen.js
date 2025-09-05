import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Ionicons name="cafe" size={60} color="#a9745b" />
            <Text style={styles.appName}>JustCoffee</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About JustCoffee</Text>
          <Text style={styles.description}>
            JustCoffee is your ultimate destination for premium coffee experiences. We're passionate about delivering the finest coffee beans and expertly crafted beverages right to your doorstep.
          </Text>
          <Text style={styles.description}>
            Our mission is to connect coffee lovers with exceptional coffee from around the world, while supporting sustainable farming practices and fair trade.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {[
            'Premium coffee selection',
            'Fast and reliable delivery',
            'Secure payment options',
            'Order tracking',
            'Loyalty rewards',
            '24/7 customer support'
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#a9745b" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <View style={styles.infoItem}>
            <Ionicons name="business-outline" size={20} color="#a9745b" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Company</Text>
              <Text style={styles.infoValue}>JustCoffee Inc.</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#a9745b" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>San Francisco, CA</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#a9745b" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Founded</Text>
              <Text style={styles.infoValue}>2024</Text>
            </View>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.legalText}>
            © 2024 JustCoffee Inc. All rights reserved.
          </Text>
          <Text style={styles.legalText}>
            Made with ❤️ for coffee lovers everywhere.
          </Text>
        </View>
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
  section: {
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    color: '#a9745b',
    marginTop: 12,
  },
  version: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#bdbdbd',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#a9745b',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#bdbdbd',
    lineHeight: 24,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
  },
  infoLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
  },
  legalText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
});
