import { Container } from 'react-bootstrap';
import style from './styles.module.scss';

export const Categories = () => {
    return (
        <Container className={style.categoriesContainer}>
            <h3>Buscar por categorias</h3>
            <div className={style.categories}>
                <p className={style.category}>Terrenos</p>
                <p className={style.category}>Casas</p>
                <p className={style.category}>Apartamentos</p>
                <p className={style.category}>Escritórios</p>
                <p className={style.category}>Categoria X</p>
                <p className={style.category}>Categoria Y</p>
            </div>
        </Container>
    )
}