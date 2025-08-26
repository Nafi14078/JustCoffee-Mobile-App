import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.0.244:5001/api/auth';
// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

class AuthService {
  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      
      if (response.data.success) {
        // Store token and user data
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      
      if (response.data.success) {
        // Store token and user data
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStoredUser() {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      
      if (userStr && token) {
        return {
          user: JSON.parse(userStr),
          token: token
        };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Request made but no response received
      return new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      return new Error('An unexpected error occurred');
    }
  }
}

export default new AuthService();
