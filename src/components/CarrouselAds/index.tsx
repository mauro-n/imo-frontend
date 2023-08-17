import style from './style.module.scss';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CarrouselCard } from './CarrouselCard';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';

/* Bootstrap */
import { Col, Container, Row } from 'react-bootstrap';

export const CarrouselAds = () => {
    const ADS_URL = 'https://raw.githubusercontent.com/mauro-n/api-mauro-n/main/imoIdeal-mock/getAds.json';
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        try {
            const response = await axios.get(ADS_URL);
            setItems(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const [swiperRef, setSwiperRef]: any = useState();

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();
    }, [swiperRef]);

    return (
        <Container fluid className={`${style.swiperContainer}`}>
            <Row>
                <h1 className='h3 text-center mb-3'>Anúncios destacados</h1>
            </Row>
            <Row>
                <Col xs={12} md={10} className={style.slideWrapper}>
                    <Swiper
                        onSwiper={setSwiperRef}
                        className={style.swiper}
                        slidesPerView={1}
                        spaceBetween={10}
                        grabCursor={true}
                        scrollbar={true}
                        pagination={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                pagination: { enabled: false }
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                                pagination: { enabled: false }
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                                pagination: { enabled: false }
                            },
                        }}
                        style={{
                            "--swiper-pagination-color": "#FEFEFE",
                            "--swiper-pagination-bullet-inactive-color": "#F2F2F1",
                            "--swiper-pagination-bullet-inactive-opacity": "0.5",
                            "--swiper-pagination-bullet-size": "8px",
                            "--swiper-pagination-bullet-horizontal-gap": "1px"
                        } as any}
                        modules={[Pagination, Navigation, Scrollbar]}
                    >
                        {items.length > 0 ?
                            items.map((el: any) => {
                                return (
                                    <SwiperSlide key={el.id}>
                                        <CarrouselCard
                                            region={el.location}
                                            price={el.price}
                                        />
                                    </SwiperSlide>
                                );
                            }) :
                            <div>Carregando</div>
                        }
                    </Swiper>
                </Col>
                <Col
                    xs={6}
                    md={{ span: 1, order: 'first' }}
                    className={`${style.btnCol} mt-3 mt-md-0`}
                    onClick={handlePrevious}
                >
                    <div className={`${style.btnContainer} mx-3 mx-md-0`}>
                        <span className={`${style.arrow} d-none d-md-block`}>
                            &#8249;
                        </span>
                        <span className='d-block d-md-none'>
                            Anterior
                        </span>
                    </div>
                </Col>
                <Col
                    xs={6}
                    md={1}
                    className={`${style.btnCol} mt-3 mt-md-0`}
                    onClick={handleNext}
                >
                    <div className={`${style.btnContainer} mx-3 mx-md-0`}>
                        <span className={`${style.arrow} d-none d-md-block`}>
                            &#8250;
                        </span>
                        <span className='d-block d-md-none'>
                            Próximo
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}