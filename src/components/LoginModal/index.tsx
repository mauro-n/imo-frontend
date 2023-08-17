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

export const LoginModal = (props: any) => {
    const showModal = props.showModal;
    const setIsModalOpen = props.modalCtrl;
    const [loginMode, setLoginMode] = useState(false);

    const customStyles = {
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
        }
    };

    return (
        <RegistrationProvider>
            <ReactModal
                isOpen={showModal}
                className={style.modal}
                style={customStyles}
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
                    <h2 className='text-center text-sm-start'>
                        Bem vindo ao ImoIdeal
                    </h2>
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