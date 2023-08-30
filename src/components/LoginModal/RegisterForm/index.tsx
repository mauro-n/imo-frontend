import style from '../FormStyles/style.module.scss';
/* Hooks */
import { Axios } from '../../../api/axios';
import { useEffect, useRef, useState } from 'react';
import { useRegistration } from '../../../hooks/useRegistration';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
/* Bootstrap */
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
/* Atoms */
import { Divider } from '../../Atoms/Divider';
import { LightBtn } from '../../Atoms/Buttons/LighBtn';
import { FloatingLabelPhone } from '../../Atoms/FloatingLabel/FloatingLabelPhone';
import { FloatingLabelName } from '../../Atoms/FloatingLabel/FloatingLabelName';
import { FloatingLabelEmail } from '../../Atoms/FloatingLabel/FloatingLabelEmail';
import { FloatingLabelPwd } from '../../Atoms/FloatingLabel/FloatingLabelPwd';
import { DarkBtn } from '../../Atoms/Buttons/DarkBtn';

export const RegisterForm = (props: any) => {
    const REGISTER_URL = 'auth/create-login';
    /* Extracting props */
    const setLoginMode = props.setLoginMode;
    const setIsModalOpen = props.setIsModalOpen;
    /* Hooks */
    const { registration, setRegistration } = useRegistration();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    /* State */
    const [isRegistering, setIsRegistering] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [errMsg, setErrMsg]: [string[], any] = useState([]);
    /* Refs */
    const errMsgRef: any = useRef();
    const { nameRef } = registration;
    const { emailRef } = registration;
    const { phoneRef } = registration;
    /* Context */
    const { validName, validEmail, validPwd, validPhone } = registration;
    const { email, name, phone, pwd } = registration;

    useEffect(() => {
        setRegistration((prev: any) => {
            return { ...prev, setErrMsg: setErrMsg }
        });
    }, []);

    useEffect(() => {
        if (validName && validPwd && validEmail && validPhone) {
            setAllValid(true);
        } else { setAllValid(false); }
    }, [registration]);

    const handleGoBack = (e: any) => {
        e.preventDefault();
        setIsRegistering(false)
    }

    useEffect(() => {
        setErrMsg([]);
        nameRef?.current?.focus();
    }, [isRegistering]);

    const handleSubmit = async () => {
        if (!phone) return phoneRef.current.focus();
        if (!email) return emailRef.current.focus();
        if (!isRegistering) return setIsRegistering(true);
        if (!allValid) return;

        /* This mimics a form post request */
        const params = new FormData();
        params.append('email', email);
        params.append('name', name);
        params.append('phone', phone);
        params.append('pwd', pwd);

        try {
            const response = await Axios.post(REGISTER_URL, params);
            if (response.status === 200) {
                setAuth({ user: response.data });
                setIsModalOpen(false);
                navigate('/profile/info');
                return;
            }
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg(['No server response']);
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data);
            }
        }
    }

    return (
        <Form className={style.form}>
            <p className={`
                ${style['form-header']}
                ${isRegistering ? style['opc-0'] : ''}
            `}>
                Registre uma conta na ImoIdeal
            </p>
            <div className={`
                ${style['go-back-btn-container']}
                ${isRegistering ? '' : style['opc-0']}
            `}>
                <button
                    onClick={(e) => handleGoBack(e)}
                    disabled={!isRegistering}
                >
                    Voltar
                </button>
            </div>
            <Container
                className={`
                    ${style.registerForm} mb-3
                    ${isRegistering ? style.expandedForm : ''}
                `}
            >
                <FloatingLabelPhone
                    placeholder="(XX) XXXXXX-XXXX"
                    label="Insira seu número de telefone"
                    prepend="+55"
                />
                <FloatingLabelEmail
                    label="Insira seu e-mail"
                />
                <FloatingLabelName
                    label="Insira seu nome"
                    disabled={!isRegistering}
                />
                <FloatingLabelPwd
                    label="Insira sua senha"
                    disabled={!isRegistering}
                />
            </Container>

            <p
                ref={errMsgRef}
                className={`
                    ${errMsg.length > 0 ? style['errMsg-container'] : style.hide}
                `}
            >
                {errMsg.length > 0 ?
                    errMsg.map((err: string) => {
                        return (
                            <span key={err}>{err}</span>
                        )
                    }) : <></>}
            </p>

            <DarkBtn
                handleClick={handleSubmit}
                disabled={isRegistering ? !allValid : false}
            >
                Registrar uma conta ImoIdeal
            </DarkBtn>

            <div className={`
                ${style['or-register']}
                ${isRegistering ? style['opc-0'] : ''}
            `}>
                <Divider>ou</Divider>

                <LightBtn
                    handleClick={() => setLoginMode(true)}
                    disabled={isRegistering}
                >
                    Fazer login com email
                </LightBtn>
            </div>
        </Form>
    );
}
