import style from './style.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const ProfileInfo = () => {
    const { auth } = useAuth();
    const user = auth?.user || {};
    const location = useLocation();

    useEffect(() => {
        console.log(auth.user)
    }, [])

    return (
        <>
            <div className={`${style['profile-header']} flex-column flex-sm-row`}>
                <div className={style['profile-pic-container']}>
                    <img
                        src={user?.urlimg || "https://placehold.co/300"}
                        alt="Profile Picture"
                        className={style['profile-pic']}
                    />
                    <div className={style['profile-name']}>
                        {auth?.user?.nome}
                    </div>
                </div>
                <div className={`${style['profile-info']} mt-4 mt-sm-0`}>
                    <h2 className='h4 m-0 p-0'>Informações do perfil</h2>
                    <div className={style['profile-items']}>
                        <Link to={'details'} className={style['profile-info--item']}>
                            Meus dados
                        </Link>
                        <div className={style['profile-info--item']}>
                            Alterar senha
                        </div>
                        <div className={style['profile-info--item']}>
                            Alterar foto de perfil
                        </div>
                        <div className={style['profile-info--item']}>
                            Ajuda
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`
                    ${style['profile-header']} flex-column flex-sm-row
                    ${location.pathname === '/profile/info' ? 'd-none' : ''}
                `}
            >
                <Outlet />
            </div>
        </>
    )
}