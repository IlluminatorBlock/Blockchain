// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Adjust the base URL to your Django API endpoint
  timeout: 10000, // Optional: Set a timeout for requests
});

// Optional: Add interceptors for request/response handling
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add headers or other configurations here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;