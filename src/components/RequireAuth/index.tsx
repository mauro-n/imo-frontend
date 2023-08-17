import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useVerifyAuth } from "../../hooks/useVerifyAuth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const verifyAuth = useVerifyAuth();

    useEffect(() => {
        auth?.user ? setIsLoading(false) : verify();
    }, []);

    const verify = async () => {
        setIsLoading(true);
        try {
            await verifyAuth();
        } catch (err) {
            setAuth({ user: undefined });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ?
                <div>Loading</div> :
                auth?.user ?
                    <Outlet />
                    :
                    <Navigate to='/' state={{ ...location, logPopup: true }} replace />
            }
        </>
    )
}