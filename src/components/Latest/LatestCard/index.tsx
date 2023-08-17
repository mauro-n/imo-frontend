import style from './style.module.scss';
import { useEffect, useRef } from 'react';

/* Swiper */
import 'swiper/css';
import 'swiper/css/navigation';

/* Rooms */
import room from '../../../assets/img/room1.jpg';
import room2 from '../../../assets/img/room2.jpg';
import room3 from '../../../assets/img/room3.jpg';
import room4 from '../../../assets/img/room4.jpg';
import room5 from '../../../assets/img/room5.jpg';


export const LatestCard = (props: any) => {
    const item: any = props?.data ? props.data : 'Carregando';
    const swiperRef: any = useRef(null);
    const rooms = [room, room2, room3, room4, room5];

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
            navigation: true,
            injectStyles: [
                `
                  .swiper-button-next,
                  .swiper-button-prev {
                    background-color: rgba(247,247,247, 0.7);
                    padding: 8px 8px;
                    border-radius: 100%;
                    color: black;
                    width: 1em;
                    height: 1em;
                    font-weight: 800;
                  }
                  .swiper-pagination-bullet{
                    width: 40px;
                    height: 40px;
                    background-color: red;
                  }
              `,
            ],
        };

        Object.assign(swiperContainer, params);
        swiperContainer.initialize();

    }, []);

    return (
        <div className={style.cardContainer}>
            <swiper-container init={false} ref={swiperRef} className={style.swiper}>
                <swiper-slide className={style.slide}>
                    <img src={rooms[rooms.length * Math.random() | 0]} alt="" className={style.img} />
                </swiper-slide>
                <swiper-slide className={style.slide}>
                    <img src={rooms[rooms.length * Math.random() | 0]} alt="" className={style.img} />
                </swiper-slide>
                <swiper-slide className={style.slide}>
                    <img src={rooms[rooms.length * Math.random() | 0]} alt="" className={style.img} />
                </swiper-slide>
                <swiper-slide className={style.slide}>
                    <img src={rooms[rooms.length * Math.random() | 0]} alt="" className={style.img} />
                </swiper-slide>
                <swiper-slide className={style.slide}>
                    <img src={rooms[rooms.length * Math.random() | 0]} alt="" className={style.img} />
                </swiper-slide>
            </swiper-container>
            <div className={style.label}>
                <h5>{item.location}</h5>
                <p>{item.price} R$</p>
            </div>
        </div>
    )
}