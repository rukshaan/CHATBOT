import axios from 'axios';
import { HOST } from '../../lib/utils/constants'; // ✅ Correct import

const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: if you're using cookies
});

export default apiClient;
