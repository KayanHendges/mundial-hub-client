import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'mundialhub.token': token } = parseCookies()

export const api = axios.create({
    // baseURL: 'https://api.mundialhub.com.br/'
    baseURL: 'http://localhost:3001/'
})

api.interceptors.request.use(config => {
    console.log(config);

    return config;
  })

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}