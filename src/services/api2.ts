import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://www.mundialhub.com.br/'
})