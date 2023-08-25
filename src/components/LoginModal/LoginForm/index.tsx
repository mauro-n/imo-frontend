import style from '../FormStyles/style.module.scss'
/* Hooks */
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { useAuth } from '../../../hooks/useAuth';
/* Bootstrap */
import Form from 'react-bootstrap/Form';
import { Container, FloatingLabel } from 'react-bootstrap';
/* Components */
import { Divider } from '../../Atoms/Divider';
import { DarkBtn } from '../../Atoms/Buttons/DarkBtn';
import { LightBtn } from '../../Atoms/Buttons/LighBtn';

export const LoginForm = (props: any) => {
    const LOGIN_URL = 'auth/authenticate';
    /* Extracting props */
    const setLoginMode = props.setLoginMode;
    const setIsModalOpen = props.setIsModalOpen;
    /* Hooks */
    const location = useLocation();
    const from = location.state?.location?.pathname || '/profile/info';
    const navigate = useNavigate();
    const axios = useAxios();
    const { setAuth } = useAuth();
    /* State */
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg]: [string[], any] = useState([]);
    /* Ref */
    const emailRef: any = useRef();

    const handleRegisterClick = () => {
        setLoginMode(false);
    }

    const handleLogin = async () => {
        if (!email || !pwd) {
            return;
        }

        const loginData = new FormData();
        loginData.append('email', email);
        loginData.append('pwd', pwd);

        try {
            const response = await axios.post(LOGIN_URL, loginData);
            if (response.status === 200) {
                setAuth({user: response.data});
                setIsModalOpen(false);
                navigate(from);
            }
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg(['No server response']);
            }
            if (err.response.status === 400) {
                setErrMsg(['Usuário ou senha incorretos']);
            } else {
                setErrMsg(['Erro 500']);
            }
        }
    }

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <Form>
            <p className='text-center mb-2'>Faça login na sua conta ImoIdeal</p>
            <Container className='my-4'>
                <FloatingLabel label="Login com e-mail" className={style.input}>
                    <Form.Control
                        type="email"
                        placeholder='email@exemplo.com'
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setErrMsg([])}
                    />
                </FloatingLabel>

                <FloatingLabel label="Sua senha" className={style.input}>
                    <Form.Control
                        type="password"
                        placeholder='xxxxx'
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setErrMsg([])}
                    />
                </FloatingLabel>
            </Container>

            {errMsg?.length > 0 ?
                <div className={style['errMsg-container']}>
                    {errMsg.map((el) => {
                        return <p className='m-0' key={el}>{el}</p>;
                    })}
                </div> :
                <></>
            }

            <DarkBtn handleClick={handleLogin}>
                Fazer Login
            </DarkBtn>
            <Divider>ou</Divider>
            <LightBtn handleClick={handleRegisterClick}>
                Registrar uma conta ImoIdeal
            </LightBtn>
        </Form>
    );
}
