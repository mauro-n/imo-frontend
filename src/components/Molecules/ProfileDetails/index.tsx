import style from './style.module.scss';
/* Bootstrap */
import { Button, Col, Form, Row } from 'react-bootstrap';
/* Hooks */
import { useEffect, useState } from 'react';
import { Axios } from '../../../api/axios';

export const ProfileDetails = () => {
    const DETAILS_URL = 'user/my-info';
    /* State */
    const [user, setUser] = useState<any>();

    useEffect(() => {
        getProfileInfo();
    }, [])

    const getProfileInfo = async () => {
        try {
            const response = await Axios.get(DETAILS_URL);
            if (response.status === 200) {
                console.log(response.data);
                setUser(response.data);
            }
        } catch (err: any) {
            if (!err?.response) {
                console.log('Sem resposta do servidor');
            }
            console.log(err);
        }
    }
    return (
        <div className={`${style['profile-details']} p-2 text-center text-sm-start`}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} lg={6} className='text-start'>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            className={style['input']}
                            type="email"
                            value={user?.email || 'Carregando'}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group as={Col} className='text-start'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={user?.nome || 'Carregando'}
                            className={style['input']}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 text-start" >
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        value={user?.telefone || 'Carregando'}
                        disabled
                        className={style['input']}
                    />
                </Form.Group>

                <Button variant="primary" className='mt-3'>
                    Alterar dados
                </Button>
            </Form>
        </div>
    )
}