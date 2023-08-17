import { Row } from 'react-bootstrap';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

export const ProfileSideBar = () => {
    return (
        <Row className={style['sidebar']}>
            <Link to={'info'} className={style['sidebar-item']}>
                Meu perfil
            </Link>
            <Link to={'info'} className={style['sidebar-item']}>
                Gerenciar Anúncios
            </Link>
            <Link to={'info'} className={style['sidebar-item']}>
                Assinatura e faturas
            </Link>
            <Link to={'info'} className={style['sidebar-item']}>
                Favoritos
            </Link>
        </Row>
    )
}