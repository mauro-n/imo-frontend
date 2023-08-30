import style from './style.module.scss';
/* Hooks */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getDateDiff from '../../../helper/getDateDiff';
import { ConfirmAction } from '../../Atoms/ConfirmAction';
import { axiosBasic } from '../../../api/axios';
import { Loading } from '../../Atoms/Loading';

type SearchResultCardProps = {
    house: App.house,
    owner?: boolean,
    action?: any
}

export const PostCard = ({ house, owner, action }: SearchResultCardProps) => {
    const DELETE_POST_URL = 'announce/';
    /* State */
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setPosts = action;

    const handleDelete = async () => {
        setIsModalOpen(true);
        return;
    }

    const confirmDeletion = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBasic.delete(`${DELETE_POST_URL}${house.codigo}`);
            if (response.status === 200) {
                setIsModalOpen(false);
                removeItem(house);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            return navigate('/');
        }
    }

    const cancelDeletion = () => {
        setIsModalOpen(false);
        return;
    }

    const removeItem = (item: App.house) => {
        setPosts((prev: App.house[]) => {
            const newPosts = prev.filter((el) => {
                if (el.codigo !== item.codigo) return el;
            });
            return newPosts;
        });
    }

    useEffect(() => {
        const dateDiff = getDateDiff(house.data);
        setDate(dateDiff);
        const formatedPrice = house.price.split('.');
        setPrice(formatedPrice[0]);
    }, []);

    const handleSeePost = () => {
        return navigate('/posts/see-post', { replace: true, state: { postId: house.codigo } });
    }

    return (
        <>
            {isLoading ?
                <Loading /> :
                <></>
            }
            <ConfirmAction
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirm={confirmDeletion}
                onReject={cancelDeletion}
            />
            <button
                className={`${style['house-container']} d-flex flex-column flex-md-row`}>
                <section onClick={handleSeePost}>
                    <div className={style['img-container']}>
                        <img src={house.imagens[0]} alt="house picture" className={style['img']} />
                    </div>
                </section>
                <section
                    className={`${style['description-container']} p-3 p-sm-3 ps-lg-4`}
                    onClick={handleSeePost}
                >
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
                </section>
                {owner ?
                    <div className={style['manage-container']}>
                        <a
                            className={`
                            ${style['manage-btn']}
                            ${style['manage-btn--edit']}`}
                        >
                            Alterar
                        </a>
                        <a
                            className={style['manage-btn']}
                            onClick={handleDelete}
                        >
                            Excluir
                        </a>
                    </div> :
                    <></>
                }
            </button>
        </>
    )
}