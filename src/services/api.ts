import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://api.mundialhub.com.br/'
    // baseURL: 'http://localhost:3001/'
})