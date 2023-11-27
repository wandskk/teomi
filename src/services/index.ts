import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_IMAGEBB_CLIENT_API_KEY =
  process.env.NEXT_PUBLIC_IMAGEBB_CLIENT_API_KEY;
export const API_CEP = "https://viacep.com.br/";

export const api = axios.create({
  baseURL: API_URL,
});

export const apiImageBB = axios.create({
  baseURL: "https://api.imgbb.com/1",
});

export const apiCEP = axios.create({
  baseURL: API_CEP,
});
