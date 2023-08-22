import style from './style.module.scss';
/* Bootstrap */
import { Row, Form, Col, Button } from 'react-bootstrap';
/* Hooks */
import { useEffect, useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { useApp } from '../../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../hooks/useAxios';

export const SearchForm = () => {
    const SEARCH_URL = 'search';
    /* State */
    const [errMsg, setErrMsg] = useState('');
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
    const [info, setInfo] = useState<App.searchInfo | undefined>(undefined);
    const [addressText, setAddressText] = useState<string | undefined>('');
    const [addressType, setAddressType] = useState<string>();
    const [category, setCategory] = useState('1');
    const [type, setType] = useState('1');
    /* Hooks */
    const { setApp } = useApp();
    const navigate = useNavigate();
    const axiosBasic = useAxios();

    useEffect(() => {
        getSystemInfo();
    }, []);

    const getSystemInfo = async () => {
        try {
            const response = await axiosBasic.get(SEARCH_URL);
            if (response.status === 200) {
                setInfo(response.data);
            }
        } catch (err: any) {
            setErrMsg('Serviço indisponível');
        }
    }

    const handleSelectCategory = (e: string) => {
        setCategory(e);
    }

    const handleSelectType = (e: string) => {
        setType(e);
    }

    const onLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    }

    const onPlacesChanged = () => {
        const places = searchBox?.getPlaces();
        if (places && places[0].types) {
            setErrMsg('');
            setAddressText(places[0].name);
            const type = places[0].types[0];
            switch (type) {
                case "route":
                    setAddressType('1')
                    break;
                case "locality":
                    setAddressType('2');
                    break;
                case "sublocality":
                    setAddressType('2');
                    break;
                case "administrative_area_level_2":
                    setAddressType('3');
                    break;
                case "administrative_area_level_1":
                    setAddressType('4');
                    break;
                default:
                    break;
            }
            return;
        }
    }

    const handleSearch = async (e: any) => {
        e.preventDefault();
        if (!addressText || !addressType) {
            setErrMsg(`Por favor selecione um local válido,
            locais válidos são Bairros, Cidades, Ruas ou Estados`);
            return;
        }

        const data = new FormData();
        data.append('category', category);
        data.append('type', type);
        data.append('addressType', addressType);
        data.append('addressText', addressText);

        try {
            const response = await axiosBasic.post(SEARCH_URL, data);
            if (response.status === 200) {
                localStorage.removeItem('lastSearch');
                localStorage.setItem('lastSearch', JSON.stringify(response.data));
                localStorage.setItem('lastSearchParams', JSON.stringify(info));
                if (setApp) setApp({ searchResults: response.data });
                return navigate('/search');
            }
        } catch (err) {
            setErrMsg('Houve algo de errado durante sua busca')
        }
    }


    return (
        <>
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
                            <Form.Select
                                defaultValue="Categorias"
                                onChange={(e) => handleSelectCategory(e.target.value)}
                            >
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
                            <Form.Select
                                defaultValue="Vender"
                                onChange={(e) => handleSelectType(e.target.value)}
                            >
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
                            <StandaloneSearchBox
                                onLoad={onLoad}
                                onPlacesChanged={onPlacesChanged}
                            >
                                <Form.Control type='text' placeholder='Local' />
                            </StandaloneSearchBox>
                            {errMsg.length > 0 ?
                                <p className={style['err-container']}>
                                    {errMsg}
                                </p> :
                                <></>
                            }
                        </Form.Group>
                    </Row>

                    <Row className='w-100 mb-4'>
                        <Col xs={12}>
                            <Button
                                className={style.searchBtn}
                                onClick={handleSearch}
                                onSubmit={(e) => handleSearch(e)}
                                type='submit'
                            >
                                Procurar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}