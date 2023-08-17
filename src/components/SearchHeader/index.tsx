import style from './style.module.scss';
import house from '../../assets/img/house1.png';
import { Form, Row, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const SearchHeader = () => {
    const navigate = useNavigate();
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
                                md={4}
                                lg={6}
                                className={style.input}
                            >
                                <Form.Select defaultValue="Apartamento">
                                    <option>Apartamento</option>
                                    <option>Casa</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                xs={6}
                                md={4}
                                lg={6}
                                className={style.input}
                            >
                                <Form.Select defaultValue="Para Vender">
                                    <option>Para Vender</option>
                                    <option>Para Alugar</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                xs
                                lg={{ order: 'first', span: 12 }}
                                className={style.input}
                            >
                                <Form.Select defaultValue="Aldeota">
                                    <option>Selecione um Bairro</option>
                                    <option>Beira Mar</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className='w-100 px-2'>
                            <Form.Group
                                as={Col}
                                lg={6}
                                className={`${style.input} d-none d-lg-block`}
                            >
                                <Form.Select defaultValue="Aldeota">
                                    <option>Empreendimento</option>
                                    <option>Sim</option>
                                    <option>Não</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                lg={6}
                                className={`${style.input} d-none d-lg-block`}
                            >
                                <Form.Select defaultValue="Aldeota">
                                    <option>Preço</option>
                                    <option>+xxxxx</option>
                                    <option>+xxxxx</option>
                                </Form.Select>
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