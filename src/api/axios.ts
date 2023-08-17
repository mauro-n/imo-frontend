import axios from "axios";

//const BASE_URL = 'http://imofront.com/api';
//const BASE_URL = 'http://127.0.0.1:8000/api/';
const BASE_URL = 'https://imoideal.ferramenta.cc/api/';
/* This instance has interceptors for updating the auth state
at every request */
export const Axios = axios.create({
    baseURL: BASE_URL,
});

export const axiosBasic = axios.create({
    baseURL: BASE_URL,
});