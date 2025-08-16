import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#232323' : '#efefef', paddingTop: 56 }]}>
      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.menuItem} onPress={() => alert('Help & Support clicked')}>
          <Ionicons name="help-circle-outline" size={20} color="#a9745b" style={styles.icon} />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#bcbcbc" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => alert('About clicked')}>
          <Ionicons name="information-circle-outline" size={20} color="#a9745b" style={styles.icon} />
          <Text style={styles.menuText}>About</Text>
          <Ionicons name="chevron-forward" size={20} color="#bcbcbc" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.menuItem}>
          <Ionicons name="moon-outline" size={20} color="#a9745b" style={styles.icon} />
          <Text style={styles.menuText}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#706d6d',
    paddingHorizontal: 10,
    paddingTop: 56,
    justifyContent: 'flex-start',
  },
  menuBox: {
    backgroundColor: '#2c2c2c',
    borderRadius: 18,
    margin: 12,
    paddingVertical: 0,
    paddingHorizontal: 0,
    // shadow/elevation for card effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingLeft: 24,
    paddingRight: 16,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 13,
  },
  menuText: {
    fontSize: 17,
    color: '#fff',
    flex: 1,
    fontFamily: 'OpenSans-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#2c2c2c',
    marginLeft: 47, // Indent divider for icon space
  },
});
