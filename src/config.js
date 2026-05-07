// src/config.js

// Development - use your computer's IP address
const DEV_API_BASE_URL = "https://justcoffee-web-app.onrender.com/api";

// Production - replace with your actual production URL
const PROD_API_BASE_URL = "https://justcoffee-web-app.onrender.com/api";

// Use development URL in development, production in production
const API_BASE_URL = __DEV__ ? DEV_API_BASE_URL : PROD_API_BASE_URL;

// Alternatively, if you want to always use development for now:
// const API_BASE_URL = 'https://justcoffee-web-app.onrender.com/api';

export { API_BASE_URL };

