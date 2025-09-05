import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.0.104:5000/api/products';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include JWT token in headers
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

class ProductService {
  async getAll() {
    const res = await api.get('/');
    return res.data;
  }

  async create(product) {
    const res = await api.post('/', product);
    return res.data;
  }

  async update(id, product) {
    const res = await api.put(`/${id}`, product);
    return res.data;
  }

  async remove(id) {
    const res = await api.delete(`/${id}`);
    return res.data;
  }
}

export default new ProductService();
