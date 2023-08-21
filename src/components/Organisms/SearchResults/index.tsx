import style from './style.module.scss';
import { useApp } from '../../../hooks/useApp';
//import { useAxios } from '../../hooks/useAxios';

export const SearchResults = () => {
    //const axios = useAxios();
    const { app } = useApp();

    return (
        <div>
            {app.searchResults.length > 0 ?
                app.searchResults.map((house) => {
                    return (
                        <article key={house.codigo} className={`${style['house-container']} d-flex flex-column flex-md-row`}>
                            <div className={style['img-container']}>
                                <img src={house.imagens[0]} alt="house picture" className={style['img']} />
                            </div>
                            <div className={`${style['description-container']} p-1 p-sm-3 ps-lg-4`}>
                                <h3 className={style['title']}>{house.title}</h3>
                                <p className={`${style['address']} text-center px-2 text-sm-start`}>{house.address}</p>
                                <ul className={style['details-container']}>
                                    <li className={style['detail']}>{house.quartos} Quartos</li>
                                    <li className={style['detail']}>{house.banheiros} Banheiros</li>
                                    <li className={style['detail']}>{house.metros} m2</li>
                                    <li className={style['detail']}>{house.vagas} Vaga(s)</li>
                                    {house.areaext ? <li className={style['detail']}>Área externa</li> : <></>}
                                    {house.arealzr ? <li className={style['detail']}>Área de lazer</li> : <></>}
                                </ul>
                                <p className={style['price']}>{house.price}</p>
                                <p className={style['date']}>{house.data}</p>
                            </div>
                        </article>
                    )
                }) :
                <div>Carregando</div>
            }
        </div>
    )
}