import { Button, Col, Form, Row } from 'react-bootstrap';
import style from './style.module.scss';
export const ProfileDetails = () => {
    return (
        <div className={`${style['profile-details']} p-2 text-center text-sm-start`}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} lg={6}>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" value="##" disabled />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" value="##" disabled />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control value="##" disabled />
                </Form.Group>

                <Button variant="primary" className='mt-3'>
                    Alterar dados
                </Button>
            </Form>
        </div>
    )
}