import style from './style.module.scss';
/* Bootstrap */
import { Button, Col, Container, Form, Row } from "react-bootstrap";
/* Hooks */
import { axiosBasic } from '../../../api/axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
/* Components */
import { InputHelp } from '../../Atoms/InputHelp';
import { ImgInputRenderer } from '../../Molecules/ImgInputRenderer';
import { StandaloneSearchBox } from '@react-google-maps/api';

export const CreateAd = () => {
    const CREATE_ANNOUNCE_ULR = 'announce';
    const SYSINFO_URL = 'search';
    const navigate = useNavigate();
    /*--------------------- State ---------------------*/
    const sysInfoIniState: App.searchInfo = { categorias: [], tipos: [] };
    const [sysInfo, setSysInfo] = useState<App.searchInfo>(sysInfoIniState);
    const [errMsg, setErrMsg] = useState<string | string[]>('');

    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
    //const [addressType, setAddressType] = useState('');
    const [address, setAddress] = useState<string | undefined>('');

    /*--------------------- State / Category / Type ---------------------*/
    const [category, setCategory] = useState('1');
    const [type, setType] = useState('1');

    /*--------------------- State / Title ---------------------*/
    const titleLimit = 70;
    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);
    const [validTitle, setValidTitle] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const handleTitleChange = (e: string) => {
        setTitle(e);
        if (e.length > 0) return setValidTitle(true);
        return setValidTitle(false);
    };

    /*--------------------- State / Price ---------------------*/
    const [price, setPrice] = useState('');
    const [priceFocus, setPriceFocus] = useState(false);
    const [validPrice, setValidPrice] = useState(false);
    const priceRef = useRef<HTMLInputElement>(null);
    const numberOnlyReg = /[\D\s\._\-]+/g;
    const priceFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const handlePriceChange = (e: string) => {
        // Removes all inválid characteres
        const value = e.replace(numberOnlyReg, '');
        if (Number(value) === 0) {
            if (priceRef.current) priceRef.current.value = '';
            setPrice('');
            return setValidPrice(false);
        }
        if (priceRef.current) priceRef.current.value = value;
        setPrice(value);
        if (value.length > 0) return setValidPrice(true);
        return setValidPrice(false);
    };

    useEffect(() => {
        if (priceFocus && Number(price) === 0) {
            setPrice('');
            if (priceRef.current) priceRef.current.value = '';
            return;
        };
        const sanitized = price.replace(numberOnlyReg, '');
        const value = priceFormatter.format(Number(sanitized));
        if (priceRef.current) priceRef.current.value = value;
        return;
    }, [priceFocus]);

    /*--------------------- State / Area ---------------------*/
    const areaFormatter = Intl.NumberFormat('pt-BR');
    const [area, setArea] = useState('');
    const [validArea, setValidArea] = useState(false);
    const [areaFocus, setAreaFocus] = useState(false);
    const areaRef = useRef<HTMLInputElement>(null);
    const handleAreaChange = (e: string) => {
        const value = e.replace(numberOnlyReg, '');
        if (Number(value) === 0) {
            if (areaRef.current) areaRef.current.value = '';
            setArea('');
            setValidArea(false);
            return;
        }
        setArea(value);
        if (areaRef.current) areaRef.current.value = value;
        if (value.length > 0) return setValidArea(true);
        return setValidArea(false);
    }
    useEffect(() => {
        const sanitized = area.replace(numberOnlyReg, '');
        if (areaFocus && Number(sanitized) === 0) {
            setArea('');
            if (areaRef.current) areaRef.current.value = '';
            return;
        };
        const formatted = areaFormatter.format(Number(sanitized));
        if (areaRef.current) areaRef.current.value = formatted;
        return;
    }, [areaFocus]);

    /*--------------------- State / priceByMeter ---------------------*/
    const [priceMeter, setPriceMeter] = useState('');
    useEffect(() => {
        if (Number(area) === 0 || Number(price) === 0) {
            setPriceMeter('');
            return;
        }
        const priceByMeter = (Number(price || '0') / Number(area || '0')).toFixed(1);
        setPriceMeter(priceByMeter);
        return;
    }, [area, price])

    /*--------------------- State / Rooms / Bathrooms / Parking ---------------------*/
    const [numRooms, setNumRooms] = useState('1');
    const [numBath, setNumBath] = useState('0');
    const [numParking, setNumParking] = useState('0');

    /*--------------------- State / Description ---------------------*/
    const decriptionLimit = 300;
    const [description, setDescription] = useState('');
    const [descriptionFocus, setDescriptionFocus] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const handleDescChange = (e: string) => {
        setDescription(e);
        if (e.length > 0) return setValidDescription(true);
        return setValidDescription(false);
    }

    /*--------------------- State / Images ---------------------*/
    const image1 = {
        id: '1',
        file: ''
    }

    const maxImgNum = 10;
    const [images, setImages] = useState<any[]>([image1]);
    const [canAdd, setCanAdd] = useState(false);
    const imageSectionRef: any = useRef();

    useEffect(() => {
        if (images.length == 0) {
            return setCanAdd(true)
        };
        const lastItem = images[images.length - 1];
        if (lastItem?.file) {
            setCanAdd(true);
        } else {
            setCanAdd(false);
        }
    }, [images])

    const handleAddImg = () => {
        if (images.length >= maxImgNum) return;
        if (images.length === 0) {
            setImages((prev) => {
                return [...prev, { id: '1', file: '' }];
            });
            return;
        }
        const lastItem = images[images.length - 1];
        if (!lastItem.file) return;
        const lastId = Number(lastItem.id);
        setImages((prev) => {
            return [...prev, { id: `${lastId + 1}`, file: '' }];
        });
    }

    /*--------------------- State / Checkboxes ---------------------*/
    const [hasPool, setHasPool] = useState(false);
    const [hasAreaLz, setHasAreaLz] = useState(false);
    const [hasAreaExt, setHasAreaExt] = useState(false);

    /*------------------------------------------*/

    const onLoadSearch = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    }

    const onPlacesChanged = () => {
        const places = searchBox?.getPlaces();
        if (places && places[0].types) {
            setErrMsg('');
            setAddress(places[0].name);
            //const type = places[0].types[0];
            /* switch (type) {
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
            } */
            return;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrMsg('');

        if (!title || !validTitle) { if (titleRef.current) return titleRef.current.focus(); };
        if (!price || !validPrice) { if (priceRef.current) return priceRef.current.focus(); };
        if (!area || !validArea) { if (areaRef.current) return areaRef.current.focus(); };
        if (!description || !validDescription) { if (descriptionRef.current) return descriptionRef.current.focus(); };
        if (!images || (images.length === 1 && !images[images.length - 1].file)) {
            if (imageSectionRef.current) imageSectionRef.current.scrollIntoView();
            return;
        };
        if (!address) {
            setErrMsg('Insira um endereço válido');
            return;
        };

        const data = new FormData();
        data.append('categoria', category);
        data.append('tipo', type);
        data.append('title', title);
        data.append('descricao', description);
        data.append('address', address);
        for (let img of images) {
            if (!img.file) continue;
            data.append('imagens[]', img.file);
        }
        data.append('price', price);
        data.append('quartos', numRooms);
        data.append('banheiros', numBath);
        data.append('metros', area);
        data.append('vagas', numParking);
        data.append('areaext', hasAreaExt ? 'true' : 'false');
        data.append('piscina', hasPool ? 'true' : 'false');
        data.append('arealzr', hasAreaLz ? 'true' : 'false');

        try {
            const response = await axiosBasic.post(CREATE_ANNOUNCE_ULR, data);
            const postId = response.data['success_message'];
            return navigate('/posts/see-post', { replace: true, state: { postId: postId } });
        } catch (err: any) {
            console.log(err);
            if (!err.response) return setErrMsg('Sem serviço');
            if (err.response?.data['error_message']) return setErrMsg(err.response.data['error_message']);
            setErrMsg(err.response.data);
            return;
        }
    }

    /*--------------------- BOOT ---------------------*/

    const getSystemInfo = async () => {
        try {
            const response = await axiosBasic.get(SYSINFO_URL);
            setSysInfo(response.data);
        } catch (err: any) {
            if (!err.response) {
                return setErrMsg('Serviço indisponível');
            }
        }
    }

    useEffect(() => {
        getSystemInfo();
        if (titleRef.current) return titleRef.current.focus();
    }, []);

    return (
        <Container className={style['createAd-container']}>
            <h2 className="h3 text-center">Publique seu Anúncio</h2>
            <p className='mb-4 mb-sm-0'>
                Preencha os campos abaixo para publicar o seu anúncio, qualquer dúvida cheque
                os sinais de interrogação.
            </p>
            <Form className={style['form-container']}>
                <Row>
                    {/* TITLE INPUT */}
                    <Form.Group as={Col} lg={12} className={style['title-form']}>
                        <Form.Label>
                            Insira o título do anúncio
                            <InputHelp id='titleDesc'>
                                O título do anúncio é o texto que será exibido
                                nos resultados de busca e também abaixo das fotos.
                                Por favor insira um título que descreva o seu imóvel
                                e que seja interessante para os possíveis compradores.
                            </InputHelp>
                        </Form.Label>
                        <Form.Control
                            type='text'
                            onChange={(e) => handleTitleChange(e.target.value)}
                            onFocus={() => setTitleFocus(true)}
                            onBlur={() => setTitleFocus(false)}
                            maxLength={titleLimit}
                            ref={titleRef}
                            aria-describedby='titleDesc'
                            className={`
                                ${titleFocus || !title ?
                                    '' :
                                    validTitle ? style['valid-input']
                                        : style['invalid-input']
                                }
                            `}
                        />
                        {titleFocus && title ?
                            <Form.Text className={style['input-auxtext']}>
                                Caracteres restantes: {titleLimit - title.length}
                            </Form.Text> :
                            <></>
                        }
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} className='mb-3 mb-sm-0'>
                        <Form.Label>Selecione uma das categorias abaixo:</Form.Label>
                        <Form.Select onChange={(e) => setCategory(e.target.value)}>
                            {sysInfo?.categorias.length > 0 ?
                                sysInfo.categorias.map((cat) => {
                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                                    )
                                }) :
                                <option value="">Carregando</option>
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} className='mb-3 mb-sm-0'>
                        <Form.Label>Selecione o tipo do imóvel:</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            {sysInfo?.tipos.length > 0 ?
                                sysInfo.tipos.map((type) => {
                                    return (
                                        <option key={type.id} id={type.id} value={type.id}>{type.descricao}</option>
                                    )
                                }) :
                                <option value="">Carregando</option>
                            }
                        </Form.Select>
                    </Form.Group>
                </Row>
                <h4 className='mt-4 h4'>Sobre o imóvel</h4>
                <hr />
                <Row className='mt-4'>
                    {/* PRICE INPUT */}
                    <Form.Group as={Col} lg={4} className='mb-3 mb-sm-0'>
                        <Form.Label>
                            Preço
                            <InputHelp id='priceDesc' drop='end'>
                                Se você estiver alugando uma casa ou quarto, selecione
                                o valor mensal do aluguel.
                            </InputHelp>
                        </Form.Label>
                        <Form.Control
                            type='text'
                            onChange={(e) => handlePriceChange(e.target.value)}
                            onFocus={() => setPriceFocus(true)}
                            onBlur={() => setPriceFocus(false)}
                            ref={priceRef}
                            className={`
                                ${!priceFocus && price && !validPrice ?
                                    style['invalid-input'] : ''}
                            `}
                            aria-describedby='priceDesc'
                        />
                    </Form.Group>
                    {/* AREA INPUT */}
                    <Form.Group as={Col} lg={4} className='mb-3 mb-sm-0'>
                        <Form.Label>
                            Área (m<sup>2</sup>)
                            <InputHelp drop='end'>
                                Insira a área total útil em metros quadrados.
                            </InputHelp>
                        </Form.Label>
                        <Form.Control
                            type='text'
                            ref={areaRef}
                            onChange={(e) => handleAreaChange(e.target.value)}
                            onFocus={() => setAreaFocus(true)}
                            onBlur={() => setAreaFocus(false)}
                            className={`
                                ${!areaFocus && !validArea && area ?
                                    style['invalid-input'] : ''
                                }
                            `}
                            area-aria-describedby='areaDesc'
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg={4}>
                        <Form.Label>Preço/m<sup>2</sup></Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={priceMeter}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <Row className='mt-4'>
                    <Form.Group as={Col} lg={4} className='mb-3 mb-sm-0'>
                        <Form.Label>Quartos</Form.Label>
                        <Form.Select onChange={(e) => setNumRooms(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4+">4 ou mais</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} lg={4} className='mb-3 mb-sm-0'>
                        <Form.Label>Banheiros</Form.Label>
                        <Form.Select onChange={(e) => setNumBath(e.target.value)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3+">3 ou mais</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} lg={4} className='mb-3 mb-sm-0'>
                        <Form.Label>Vagas</Form.Label>
                        <Form.Select onChange={(e) => setNumParking(e.target.value)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3+">3 ou mais</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className='mt-4'>
                    <Form.Group as={Col} xs={12}>
                        <Form.Label>
                            Descrição do imóvel
                            <InputHelp id='descriptionHelp'>
                                Descreva seu imóvel ou inclua detalhes sobre ele e observações.
                            </InputHelp>
                        </Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            type='textbox'
                            onChange={(e) => handleDescChange(e.target.value)}
                            onFocus={() => setDescriptionFocus(true)}
                            onBlur={() => setDescriptionFocus(false)}
                            className={`
                                ${!validDescription && !descriptionFocus && description ?
                                    style['invalid-input'] : ''
                                }
                            `}
                            aria-describedby='descriptionHelp'
                        />
                        {description && descriptionFocus ?
                            <Form.Text className={style['input-auxtext']}>
                                Caracteres restantes: {decriptionLimit - description.length}
                            </Form.Text> : <></>
                        }
                    </Form.Group>
                    {/* INPUT IMAGES */}
                    <h4 className='mt-4 h4' ref={imageSectionRef} >
                        Fotos do imóvel
                    </h4>
                    <hr />
                    <Form.Group as={Col} xs={12} sm={6} className='mt-4' >
                        <ImgInputRenderer source={images} setSource={setImages} />
                        <div className='text-center mt-3'>
                            <Button
                                className={style['add-img-btn']}
                                onClick={handleAddImg}
                                disabled={!canAdd}
                            >
                                Adicionar Mais Imagens
                            </Button>
                        </div>
                    </Form.Group>
                    <Col xs={12} sm={6} className={`${style['photos-help']} mt-5 mt-sm-0`}>
                        <h4 className='h5'>Ajuda com imagens</h4>
                        <ul className='text-start'>
                            <li>Você pode adicionar até 10 imagens do seu imóvel</li>
                            <li>Imagens são essenciais para que seu anúncio ganhe destaque</li>
                            <li>Formatos suportados de imagens: X, Y, Z</li>
                            <li>O tamanho máximo da imagem é 5mb</li>
                            <li>Resolução ideal de imagem é 1200x720</li>
                            <li>Resolução mínima de imagem é 300x300</li>
                        </ul>
                    </Col>
                </Row>

                <h4 className='mt-4 h4' ref={imageSectionRef} >
                    Localização
                </h4>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Endereço do imóvel</Form.Label>
                        <hr />
                        <StandaloneSearchBox
                            onLoad={onLoadSearch}
                            onPlacesChanged={onPlacesChanged}
                        >
                            <Form.Control type='text' placeholder='Local' />
                        </StandaloneSearchBox>
                    </Form.Group>
                </Row>
                

                <h4 className='mt-5 h4'>Características do Imóvel</h4>
                <hr />
                <Container>
                    <Row className={`${style['checkboxes-container']} mt-4`}>
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Piscina"
                            onClick={(e) => setHasPool((e.target as HTMLInputElement).checked)}
                        />
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Área de Lazer"
                            onClick={(e) => setHasAreaLz((e.target as HTMLInputElement).checked)}
                        />
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Área externa"
                            onClick={(e) => setHasAreaExt((e.target as HTMLInputElement).checked)}
                        />
                    </Row>
                    <Row className='mt-5'>
                        <p>
                            Ao utilizar a plataforma Imodeal aceito
                            os <a>termos de utilização.</a>
                        </p>
                    </Row>
                </Container>

                <div className={style['submit-btn-container']}>
                    <Button
                        className={style['submit-btn']}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Continuar
                    </Button>
                </div>
                {errMsg && typeof (errMsg) === 'string' ?
                    <p className='text-danger d-block text-center mt-3'>{errMsg}*</p>
                    : <></>
                }
                {errMsg && Array.isArray(errMsg) ?
                    errMsg.map((err) => {
                        return <p key={err} className='text-danger d-block text-center mt-3'>{err}*</p>
                    }) : <></>
                }
            </Form>
        </Container >
    )
}