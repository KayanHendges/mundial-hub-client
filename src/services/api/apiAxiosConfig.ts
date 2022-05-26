import axios from "axios";
import { parseCookies } from "nookies";

function apiAxiosConfig(ctx?: any) {
  const { 'mundialhub.token': token } = parseCookies(ctx)

  const api = axios.create({
    // baseURL: 'http://192.168.0.70:3003'
    baseURL: 'https://apiv2.mundialhub.com.br/'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

export const apiV2 = apiAxiosConfig()