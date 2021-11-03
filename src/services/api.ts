import axios from 'axios';

export const api = axios.create({
    // baseURL: 'https://api.mundialhub.com.br/'
    baseURL: 'http://localhost:3001/'
})