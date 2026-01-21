import axios from 'axios';

const API = axios.create({
  // Ab hum Live Backend se connect kar rahe hain
  baseURL: 'https://day25-mini-ecommerce.onrender.com/api',
});

export default API;