import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';

import AdminDashboard from '../screens/AdminDashboard';
import OrderHistory from '../screens/OrderHistory';
import ProductCreate from '../screens/ProductCreate';
import ProductListScreen from '../screens/ProductListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ViewAllUsersScreen from '../screens/ViewAllUsersScreen';
import ViewEditProductsScreen from '../screens/ViewEditProductsScreen';
import ViewOrdersScreen from '../screens/ViewOrdersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** -------- BOTTOM TABS -------- */
function MainTabs() {
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
            return <Ionicons name="cart" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <MaterialCommunityIcons name="account" size={size} color={color} />;
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

/** -------- MAIN APP NAVIGATOR -------- */
export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // New state: controls whether Intro screen is visible
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Auto-hide intro screen after 3 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Loader while checking auth state
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E1E'
      }}>
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showIntro ? (
          // Always show Intro first
          <Stack.Screen name="Intro" component={IntroScreen} />
        ) : isAuthenticated ? (
          // Logged in → go to main app
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={({ route }) => ({
                title: route.params?.product?.name || 'Details',
              })}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="ProductCreate" component={ProductCreate} />
            <Stack.Screen name="ViewEditProducts" component={ViewEditProductsScreen} />
            <Stack.Screen name="ProductList" component={ProductListScreen} />

            {/* ✅ Updated to match your navigation calls */}
            <Stack.Screen name="UsersList" component={ViewAllUsersScreen} />
            <Stack.Screen name="OrdersList" component={ViewOrdersScreen} />

            <Stack.Screen name="OrderHistory" component={OrderHistory} />
          </>
        ) : (
          // Not logged in → show login/sign up flow
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
