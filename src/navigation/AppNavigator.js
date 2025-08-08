import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs for authenticated user
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#2c2c2c' },
        tabBarActiveTintColor: '#a9745b',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'coffee';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2c2c2c' },
          headerTintColor: 'white',
          headerTitleStyle: { fontFamily: 'OpenSans-Bold' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={({ route }) => ({
            title: route.params?.product?.name || 'Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
