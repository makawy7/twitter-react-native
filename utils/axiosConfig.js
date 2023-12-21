import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.6:8001/api',
});

export default axiosInstance;
