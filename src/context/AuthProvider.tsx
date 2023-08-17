import { createContext, useState } from "react";

export const AuthContext = createContext({});
const authInitialState: Context.auth = {
    user: undefined,
};

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(authInitialState);
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            { children }
        </AuthContext.Provider>
    );
}