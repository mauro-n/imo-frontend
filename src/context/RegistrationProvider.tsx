import { createContext, useState } from 'react';

export const RegistrationContext = createContext({});
export const RegistrationProvider = ({children}: any) => {
    const [registration, setRegistration] = useState({
        phone: '',
        phoneRef: undefined,
        name: '',
        nameRef: undefined,
        email: '',
        emailRef: undefined,
        pwd: '',
        pwdRef: undefined,
        validPhone: false,
        validName: false,
        validEmail: false,
        validPwd: false,
        setErrMsg: undefined
    });

    return (
        <>
            <RegistrationContext.Provider value={{ registration, setRegistration}}>
                {children}
            </RegistrationContext.Provider>
        </>
    )
}