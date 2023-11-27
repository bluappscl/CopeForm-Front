import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL_API, // Reemplaza esta URL con la URL base que deseas utilizar
});

export default axiosInstance;