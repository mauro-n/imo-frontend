import axios from "axios";

const devApiUrl = import.meta.env.VITE_DEV_API_URL;
const apiUrl = import.meta.env.VITE_API_URL;

const BASE_URL = devApiUrl;

/* This instance has interceptors for updating the auth state
at every request */
export const Axios = axios.create({
    baseURL: BASE_URL,
});

export const axiosBasic = axios.create({
    baseURL: BASE_URL,
});