import style from './style.module.scss';
import { useState } from 'react';
/* Context */
import { RegistrationProvider } from '../../context/RegistrationProvider';
/* Components */
import { RegisterForm } from './RegisterForm';
import ReactModal from "react-modal"
import { LoginForm } from './LoginForm';
/* Assets */
import times from '../../assets/icon/times.svg';
import { Heading } from '../Atoms/Heading';

export const LoginModal = (props: any) => {
    const showModal = props.showModal;
    const setIsModalOpen = props.modalCtrl;
    const [loginMode, setLoginMode] = useState(false);

    return (
        <RegistrationProvider>
            <ReactModal
                isOpen={showModal}
                className={style.modal}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
            >
                <header className={style.modalHeader}>
                    <button
                        className={style.closeModal}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <img src={times} alt="Fechar" />
                    </button>
                    <div className={style.titleModal}>Entrar ou cadastrar</div>
                </header>
                <div className={style.modalContent}>
                    <Heading as='h2' size='md' center={false}>
                        Bem vindo ao ImoIdeal
                    </Heading>
                    {loginMode ?
                        <LoginForm
                            setLoginMode={setLoginMode}
                            setIsModalOpen={setIsModalOpen}
                        /> :
                        <RegisterForm
                            setLoginMode={setLoginMode}
                            setIsModalOpen={setIsModalOpen}
                        />
                    }
                </div>
            </ReactModal>
        </RegistrationProvider>
    )
}