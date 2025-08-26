import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.0.244:5001/api/products';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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