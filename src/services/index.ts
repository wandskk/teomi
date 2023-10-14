import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_CEP = "https://viacep.com.br/";

export const api = axios.create({
  baseURL: API_URL,
});

export const apiCEP = axios.create({
  baseURL: API_CEP,
});
