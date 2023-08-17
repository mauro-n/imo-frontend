import { axiosBasic } from "../api/axios";
import { useAuth } from "./useAuth";

export const useVerifyAuth = () => {
    const VERIFY_URL = '/auth/verify-auth';
    const { setAuth } = useAuth();

    const verify = async () => {
        try {
            const response = await axiosBasic.get(VERIFY_URL);
            if (response.status === 200) {
                setAuth({ user: response.data });
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    return verify;
}