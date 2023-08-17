import { useContext } from 'react';
import { RegistrationContext } from "../context/RegistrationProvider";

export const useRegistration = (): any => {
    const context = useContext(RegistrationContext);
    return context;
}