import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      subtitle: 'Receive order updates and promotions',
      icon: 'notifications-outline',
      type: 'switch',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      subtitle: 'Use dark theme throughout the app',
      icon: 'moon-outline',
      type: 'switch',
      value: darkMode,
      onToggle: (value) => {
        setDarkMode(value);
        Alert.alert('Feature Coming Soon', 'Theme switching will be available in a future update.');
      },
    },
    {
      id: 'location',
      title: 'Location Services',
      subtitle: 'Find nearby coffee shops',
      icon: 'location-outline',
      type: 'switch',
      value: locationServices,
      onToggle: setLocationServices,
    },
    {
      id: 'language',
      title: 'Language',
      subtitle: 'English',
      icon: 'language-outline',
      type: 'arrow',
      onPress: () => Alert.alert('Feature Coming Soon', 'Language selection will be available soon.'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      subtitle: 'View our privacy policy',
      icon: 'shield-outline',
      type: 'arrow',
      onPress: () => Alert.alert('Privacy Policy', 'We respect your privacy and protect your personal information.'),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      subtitle: 'View terms and conditions',
      icon: 'document-text-outline',
      type: 'arrow',
      onPress: () => Alert.alert('Terms of Service', 'By using JustCoffee, you agree to our terms and conditions.'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
            disabled={item.type === 'switch'}
          >
            <View style={styles.settingLeft}>
              <Ionicons name={item.icon} size={24} color="#a9745b" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
            </View>

            <View style={styles.settingRight}>
              {item.type === 'switch' ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: '#2c2c2c', true: '#a9745b' }}
                  thumbColor={item.value ? '#fff' : '#bdbdbd'}
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#bdbdbd" />
              )}
            </View>
          </TouchableOpacity>
        ))}
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#23232b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#bdbdbd',
  },
  settingRight: {
    marginLeft: 16,
  },
});
