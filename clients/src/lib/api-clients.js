import axios from 'axios';
import { HOST } from './utils/constants.js';

// src/utils/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: HOST, // 🔁 Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;