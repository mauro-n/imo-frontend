import style from './style.module.scss';
/* Hooks */
import { useState } from 'react';
/* Bootstrap */
import { Button, Form } from 'react-bootstrap';

export const SearchFilter = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen((prev) => {
            return !prev;
        });
    }

    return (
        <div className={`${style['searchFilter-container']} mt-lg-3`}>
            <h3
                className={`${style['title']} h5`}
                onClick={handleToggle}
            >
                Filtros
            </h3>
            <div className={`
                ${style['form-container']}
                ${isOpen ? '' : style['hidden']}
            `}>
                <Form className={style['form']}>
                    <Form.Group className={style['form-group']}>
                        <Form.Label>Ordem</Form.Label>
                        <Form.Select className={style['input-select']} defaultValue="0">
                            <option>Relevância</option>
                            <option>Data</option>
                            <option>Mais barato (0-9)</option>
                            <option>Mais caro (0-9)</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={style['form-group']}>
                        <Form.Label>Quartos</Form.Label>
                        <Form.Select className={style['input-select']} defaultValue="0">
                            <option>--</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5 ou mais</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={style['form-group']}>
                        <p>Metros</p>
                        <div className={style['select-input-container']}>
                            <Form.Label>De (m2)</Form.Label>
                            <Form.Control className={style['input']} type='text' />
                        </div>
                        <div className={style['select-input-container']}>
                            <Form.Label>Até (m2)</Form.Label>
                            <Form.Control className={style['input']} type='text' />
                        </div>
                    </Form.Group>

                    <Form.Group className={style['form-group']}>
                        <p>Faixa de preço</p>
                        <div className={style['select-input-container']}>
                            <Form.Label>De (R$)</Form.Label>
                            <Form.Control className={style['input']} type='text' />
                        </div>
                        <div className={style['select-input-container']}>
                            <Form.Label>Até (R$)</Form.Label>
                            <Form.Control className={style['input']} type='text' />
                        </div>
                    </Form.Group>

                    <div className='text-center'>
                        <Button variant="primary" type="submit" className={style['search-btn']}>
                            Filtrar
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}