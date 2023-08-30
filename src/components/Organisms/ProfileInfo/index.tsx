import style from './style.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

export const ProfileInfo = () => {
    const { auth } = useAuth();
    const user = auth?.user || {};
    const [editMode, setEditMode] = useState(false);

    const handleToggleEditMode = () => {
        setEditMode((prev) => {
            return !prev;
        })
    }

    return (
        <>
            <div className={`${style['profile-header']} flex-column flex-sm-row`}>
                <div className={style['profile-pic-container']}>
                    <img
                        src={user?.urlimg || "https://placehold.co/300"}
                        alt="Profile Picture"
                        className={style['profile-pic']}
                    />
                    <div className={style['profile-btn-container']}>
                        <button className={style['profile-btn']}>
                            Alterar
                        </button>
                        <button
                            className={`${style['profile-btn']}
                            ${style['btn-color']}
                        `}>
                            Excluir
                        </button>
                    </div>
                </div>
                <section className={`${style['profile-info']} mt-4 mt-sm-0`}>
                    {editMode ?
                        <>
                            <h2 className={style['update-title']}>
                                Atualizar dados
                            </h2>

                            <button
                                className={style['update-btn']}
                                onClick={handleToggleEditMode}>
                                Voltar
                            </button>

                            <Form className={style['edit-container']}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome de usuário</Form.Label>
                                    <Form.Control
                                        className={style['edit-input']}
                                        placeholder="Nome"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className={style['edit-input']}
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        className={style['edit-input']}
                                        placeholder="Telefone"
                                    />
                                </Form.Group>
                                <button className={`
                                    ${style['profile-btn']}
                                    ${style['btn-color']}
                                `}>
                                    Alterar dados
                                </button>
                            </Form>
                        </> :
                        <>
                            <button
                                className={style['update-btn']}
                                onClick={handleToggleEditMode}>
                                Atualizar dados
                            </button>
                            <h2 className='h4 m-0 mb-1 p-0'>{auth?.user?.nome}</h2>
                            <p className='my-2'>
                                <span className={style['profile-info-title']}>
                                    Email:
                                </span>
                                <span className={style['profile-info-data']}>
                                    {' ' + auth?.user?.email || 'Carregando'}
                                </span>
                            </p>
                            <p className='my-2'>
                                <span className={style['profile-info-title']}>
                                    Whatsapp:
                                </span>
                                <span className={style['profile-info-data']}>
                                    {' +55 ' + auth?.user?.telefone}
                                </span>
                            </p>
                            <hr className='my-3' />
                            <div className={style['plano-container']}>
                                <h2 className={style['plano']}>
                                    Plano:
                                </h2>
                                <span className={style['plano-badge']}> Grátis</span>
                            </div>
                            <button className={style['plano-btn']}>Melhorar plano</button>
                        </>
                    }
                </section>
            </div>
        </>
    )
}