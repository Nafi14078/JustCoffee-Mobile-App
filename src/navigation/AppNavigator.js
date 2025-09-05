import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Screens
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** -------- BOTTOM TABS -------- **/
function MainTabs() {
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#2c2c2c' },
        tabBarActiveTintColor: '#a9745b',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Cart') {
            return (
              <View style={{ position: 'relative' }}>
                <MaterialCommunityIcons name="cart" size={size} color={color} />
                {itemCount > 0 && (
                  <View style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: '#ff6b6b',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                      {itemCount > 99 ? '99+' : itemCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          } else if (route.name === 'Profile') {
            return <Ionicons name="person" size={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/** -------- MAIN APP NAVIGATOR -------- **/
export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Auth stack
          <>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          // App stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={({ route }) => ({
                headerShown: true,
                title: route.params?.product?.name || 'Details',
                headerStyle: { backgroundColor: '#1E1E1E' },
                headerTintColor: '#fff',
              })}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
