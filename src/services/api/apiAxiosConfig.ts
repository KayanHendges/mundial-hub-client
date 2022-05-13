import axios from "axios";
import { parseCookies } from "nookies";

export function apiAxiosConfig(ctx?: any) {
  const { 'mundialhub.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://192.168.0.70:3003'
    // baseURL: 'https://api.mundialhub.com.br/v2'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}