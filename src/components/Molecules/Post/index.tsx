import style from './style.module.scss';
/* Bootstrap */
import { Col, Container, Row } from "react-bootstrap"
/* Components */
import { Swiper, SwiperSlide } from 'swiper/react';
import { SmBadge } from '../../Atoms/SmBadge';
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
/* Hooks */
//import { useState } from 'react';
import getDateDiff from '../../../helper/getDateDiff';

type Post = {
    data: App.house
}

export const Post = ({ data }: Post) => {
    //const [swiperRef, setSwiperRef]: any = useState();
    const dataDiff = getDateDiff(data.data);

    return (
        <Container className={style['postContainer']}>
            <Row>
                <Col className={style['main']} xs={12} md={8}>
                    <section>
                        <Swiper
                            /* onSwiper={setSwiperRef} */
                            slidesPerView={1}
                            grabCursor={true}
                            scrollbar={true}
                            pagination={true}
                            style={{
                                "--swiper-pagination-color": "#BB2D3B",
                                "--swiper-pagination-bullet-inactive-color": "#BB2D3B",
                                "--swiper-pagination-bullet-inactive-opacity": "0.5",
                                "--swiper-pagination-bullet-size": "8px",
                                "--swiper-pagination-bullet-horizontal-gap": "1px"
                            } as any}
                            modules={[Pagination, Navigation, Scrollbar]}
                        >
                            {data.imagens.length > 0 ?
                                data.imagens.map((el: any) => {
                                    return (
                                        <SwiperSlide key={el.id}>
                                            <img src={el} className={style['swiper-img']} alt="" />
                                        </SwiperSlide>
                                    );
                                }) :
                                <div>Carregando</div>
                            }
                        </Swiper>
                    </section>
                    <section>
                        <h2 className={style['title-container']}>
                            <span className={style['title']}>{data.title}</span>
                            <span className={style['price']}> (R$ {data.price})</span>
                        </h2>
                        <p className={style['subtitle']}>{data.descricao}</p>
                        <p className={style['date']}>{dataDiff}</p>
                        <hr />
                        <h2 className={style['h2']}>Descrição</h2>
                        <p className={style['description']}>{data.title}</p>
                        <hr />
                        <h2 className={style['h2']}>Mapa (Localização)</h2>
                        <div className={style['map']}></div>
                        <h2 className={style['h2']}>Pontos Próximo</h2>
                    </section>
                </Col>
                <Col className={style['sidebar']}>
                    <section className={style['profile-container']}>
                        <img src={data.user?.img} alt="Foto do usuário" className={style['profile-img']} />
                        <div className={style['profile-info-container']}>
                            <h2 className={style['profile-name']}>
                                {data.user.nome}
                            </h2>
                            <p className={style['profile-phone']}>
                                +55 {data.user.tel}
                            </p>
                        </div>
                    </section>
                    <hr />
                    <section className={style['attributes-section']}>
                        <h3>Características</h3>
                        <div className={style['attributes-container']}>
                            <SmBadge>{`${data.quartos} Quarto(s)`}</SmBadge>
                            <SmBadge>{`${data.banheiros} Banheiro(s)`}</SmBadge>
                            {data.areaext ? <SmBadge>Área Externa</SmBadge> : <></>}
                            {data.arealzr ? <SmBadge>Área de Lazer</SmBadge> : <></>}
                            {data.piscina ? <SmBadge>Piscina</SmBadge> : <></>}
                        </div>
                    </section>
                    <hr />
                    <section className={style['attributes-section']}>
                        <h3>Condições</h3>
                        <p className='m-0 p-0'>Texto</p>
                    </section>
                    <hr />
                    <div className={style['btn-container']}>
                        <button className={`${style['btn']} ${style['btn-transparent']}`}>
                            Salvar
                        </button>
                        <button className={style['btn']}>Enviar mensagem</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}