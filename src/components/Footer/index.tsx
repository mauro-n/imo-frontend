import { Container } from 'react-bootstrap';
import style from './style.module.scss';

export const Footer = () => {
    return (
        <Container fluid className={style.footer}>
            <Container className='text-center'>
                <span>&reg; </span>
                <span>2023 ImoIdeal</span>
                <span className={style.divider}></span>
                <a href="#">Privacidade</a>
                <span className={style.divider}></span>
                <a href="#">Termos</a>
                <span className={style.divider}></span>
                <a href="#">Informações da empresa</a>
            </Container>
        </Container>
    )
}