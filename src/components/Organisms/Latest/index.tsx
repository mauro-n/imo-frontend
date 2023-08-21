import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import axios from 'axios';

import { LatestCard } from '../../Molecules/LatestCard';
import { SeeMoreBtn } from '../../Atoms/SeeMoreBtn';

export const Latest = () => {
    const LATEST_URL = 'https://raw.githubusercontent.com/mauro-n/api-mauro-n/main/imoIdeal-mock/getAds.json';
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        try {
            const response = await axios.get(LATEST_URL);
            setItems(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className={style.latestContainer}>
            <h2 className='h3'>Anúncios recentes de Casas:</h2>
            <Row>
                <Col xs={12} sm={6} md={6} lg={3} className='m-0'>
                    {items?.length > 0 ?
                        items.slice(0, 2).map((el: any) => {
                            return <LatestCard key={el.id} data={el} />
                        }) :
                        <LatestCard data={{ loading: true }} />
                    }
                </Col>
                <Col xs={12} sm={6} md={6} lg={3} className='m-0'>
                    {items?.length > 0 ?
                        items.slice(2, 4).map((el: any) => {
                            return <LatestCard key={el.id} data={el} />
                        }) :
                        <LatestCard data={{ loading: true }} />
                    }
                </Col>
                <Col xs={12} sm={6} md={6} lg={3} className='m-0'>
                    {items?.length > 0 ?
                        items.slice(4, 6).map((el: any) => {
                            return <LatestCard key={el.id} data={el} />
                        }) :
                        <LatestCard data={{ loading: true }} />
                    }
                </Col>
                <Col xs={12} sm={6} md={6} lg={3} className='m-0'>
                    {items?.length > 0 ?
                        items.slice(6, 8).map((el: any) => {
                            return <LatestCard key={el.id} data={el} />
                        }) :
                        <LatestCard data={{ loading: true }} />
                    }
                </Col>
            </Row>
            <SeeMoreBtn></SeeMoreBtn>
        </Container>
    );
};