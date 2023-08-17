import { useEffect } from "react";
import { useVerifyAuth } from "./useVerifyAuth";
import { Axios } from "../api/axios";

export const useAxios = () => {
    const verifyAuth = useVerifyAuth();

    useEffect(() => {
        const responseInterceptor = Axios.interceptors.request.use(
            (response) => {
                verifyAuth();
                return response;
            }, (err) => {
                Promise.reject(err);
            }
        );


        return () => Axios.interceptors.request.eject(responseInterceptor);
    }, []);

    return Axios;
}