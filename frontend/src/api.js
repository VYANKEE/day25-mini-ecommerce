import axios from 'axios';

// Yeh URL ensure karta hai ki humare backend se baat ho rahi hai
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export default API;