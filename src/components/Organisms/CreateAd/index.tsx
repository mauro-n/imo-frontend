import style from './style.module.scss';
/* Bootstrap */
import { Button, Col, Container, Form, Row } from "react-bootstrap";
/* Hooks */
import { useState, useEffect, useRef } from 'react';
import { axiosBasic } from '../../../api/axios';
import { InputHelp } from '../../Atoms/InputHelp';
import { ImgInputRenderer } from '../../Molecules/ImgInputRenderer';

export const CreateAd = () => {
    const SYSINFO_URL = 'search';
    /*--------------------- State ---------------------*/
    const sysInfoIniState: App.searchInfo = { categorias: [], tipos: [] };
    const [sysInfo, setSysInfo] = useState<App.searchInfo>(sysInfoIniState);
    const [errMsg, setErrMsg] = useState('');

    /*--------------------- State / Title ---------------------*/
    const titleLimit = 70;
    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);
    const [validTitle, setValidTitle] = useState(false);
    const titleRef: any = useRef();
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

    useEffect(() => {
        getSystemInfo();
        titleRef.current.focus();
    }, []);

    /*--------------------- State / Rooms / Bathrooms / Parking ---------------------*/
    const [numRooms, setNumRooms] = useState('');
    const [numBath, setNumBath] = useState('');
    const [numParking, setNumParking] = useState('');

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

    return (
        <Container className={style['createAd-container']}>
            <h2 className="h3 text-center">Publique seu Anúncio</h2>
            {errMsg ?
                <p className='text-danger'>{errMsg}*</p>
                : <></>
            }
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
                        <Form.Select>
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
                        <Form.Select>
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
                    <h4 className='mt-4 h4'>Fotos do imóvel</h4>
                    <hr />
                    <Form.Group as={Col} xs={12} sm={6} className='mt-4'>
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
                    <Col xs={12} sm={6} className={`${style['photos-help']} mt-4`}>
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

                <h4 className='mt-4 h4'>Características do Imóvel</h4>
                <hr />
                <Container>
                    <Row className={`${style['checkboxes-container']} mt-4`}>
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Piscina"
                        />
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Área de Lazer"
                        />
                        <Form.Check
                            className={style['checkbox']}
                            type='checkbox'
                            label="Área externa"
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
                    <Button className={style['submit-btn']}>
                        Continuar
                    </Button>
                </div>
            </Form>
        </Container>
    )
}