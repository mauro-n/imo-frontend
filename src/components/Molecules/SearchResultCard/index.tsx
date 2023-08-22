import style from './style.module.scss';
import { useEffect, useState } from 'react';
import getDateDiff from '../../../helper/getDateDiff';

type SearchResultCardProps = {
    house: App.house
}

export const SearchResultCard = ({ house }: SearchResultCardProps) => {
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const dateDiff = getDateDiff(house.data);
        setDate(dateDiff);
        const formatedPrice = house.price.split('.');
        setPrice(formatedPrice[0]);
    }, [])

    return (
        <>
            <button className={`${style['house-container']} d-flex flex-column flex-md-row`}>
                <div className={style['img-container']}>
                    <img src={house.imagens[0]} alt="house picture" className={style['img']} />
                </div>
                <div className={`${style['description-container']} p-1 p-sm-3 ps-lg-4`}>
                    <h3 className={style['title']}>{house.title}</h3>
                    <p className={`${style['address']} pt-1 ps-0 pe-5`}>{house.address}</p>
                    <ul className={style['details-container']}>
                        <li className={style['detail']}>{house.quartos} Quartos</li>
                        <li className={style['detail']}>{house.banheiros} Banheiros</li>
                        <li className={style['detail']}>{house.metros} m2</li>
                        <li className={style['detail']}>{house.vagas} Vaga(s)</li>
                        {house.areaext ? <li className={style['detail']}>Área externa</li> : <></>}
                        {house.arealzr ? <li className={style['detail']}>Área de lazer</li> : <></>}
                    </ul>
                    <p className={style['price']}>R${price}<span>/mês</span></p>
                    <p className={style['date']}>{date}</p>
                </div>
            </button>
        </>
    )
}