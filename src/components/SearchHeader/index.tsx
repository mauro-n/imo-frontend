import style from './style.module.scss';
/* Bootstrap */
import { Form, Row, Button, Col } from 'react-bootstrap';
/* Hooks */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
/* Assets */
import house from '../../assets/img/house1.png';

export const SearchHeader = () => {
    const INFO_URL = 'search-info';
    /* State */
    const [info, setInfo] = useState<App.searchInfo | undefined>(undefined);
    /* Hooks */
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        getSystemInfo();
    }, []);

    const getSystemInfo = async () => {
        try {
            const response = await axios.get(INFO_URL);
            if (response.status === 200) {
                setInfo(response.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    const handleSearch = () => {
        return navigate('/search');
    }
    return (
        <div className={style.searchHeaderContainer}>
            <div className={`${style.imgContainer} d-none d-lg-block`}>
                <img src={house} className={style.img} alt="" />
            </div>
            <div className={`${style.searchContainer} py-lg-3`}>
                <Form className={`${style.searchForm}`}>
                    <h1
                        className={`${style.heading} h3 text-center d-none d-md-block mb-3`}>
                        O melhor site para encontrar casas para vender ou alugar
                    </h1>
                    <div className={`${style.inputContainer} mb-4 w-100`}>
                        <div className={`${style.tab} d-lg-none`}>Pesquisar Imóveis</div>
                        <Row className='w-100 mt-3 mt-md-0 px-0 px-md-2 pt-2'>
                            <Form.Group
                                as={Col}
                                xs={6}
                                md={3}
                                lg={6}
                                className={style.input}
                            >
                                <Form.Select defaultValue="Categorias">
                                    {info ?
                                        info.categorias.map((el) => {
                                            return <option key={el.id} value={el.id}>{el.descricao}</option>
                                        }) :
                                        <option>Carregando..</option>
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                xs={6}
                                md={3}
                                lg={6}
                                className={style.input}
                            >
                                <Form.Select defaultValue="Para Vender">
                                    {info ?
                                        info.tipos.map((el) => {
                                            return <option key={el.id} value={el.id}>{el.descricao}</option>
                                        }) :
                                        <option>Carregando</option>
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                xs
                                lg={{ order: 'first', span: 12 }}
                                className={style.input}
                            >
                                <Form.Control type='text' placeholder='Local' />

                            </Form.Group>
                        </Row>

                        <Row className='w-100 mb-4'>
                            <Col xs={12}>
                                <Button className={style.searchBtn} onClick={handleSearch}>
                                    Procurar
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        </div>
    )
}