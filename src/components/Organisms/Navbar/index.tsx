import style from './style.module.scss';
/* Hooks */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAxios } from '../../../hooks/useAxios';
import { useVerifyAuth } from '../../../hooks/useVerifyAuth';
/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
/* Assets */
import logo from '../../../assets/img/imoIdeal.svg';
/* React-modal */
import { LoginModal } from '../../LoginModal';
import { NavDropdown } from 'react-bootstrap';

export function NavbarComp() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const axios = useAxios();
    const location = useLocation();
    const logPopup: boolean = location?.state?.logPopup;
    const { auth, setAuth } = useAuth();
    const verifyAuth = useVerifyAuth();

    const handleMyAds = () => {
        if (!auth?.user) return handleToggleModal();
        navigate('/profile/info');
        return;
    }

    const handleCreateAd = () => {
        if (!auth?.user) return handleToggleModal();
        return navigate('/profile/create-ad');
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('auth/logout');
            if (response?.status === 200) {
                setAuth({ user: undefined });
            }
        } catch (err) {
            setAuth({ user: undefined });
        }
    }

    const handleToggleModal = () => {
        setIsModalOpen((prev: any) => {
            return !prev;
        });
    }

    useEffect(() => {
        window.history.replaceState({}, document.title);
        if (logPopup) setIsModalOpen(true);
        verifyAuth();
    }, []);

    return (
        <>
            <Navbar expand="sm" className={`${style.navbar} bg-body-tertiary px-sm-5`}>
                <Container fluid>
                    <Link to='/' className={style.branding}>
                        <img src={logo} alt="ImoIdeal" className={style.logo} />
                        <span>
                            <span className={style.imo}>Imo</span>
                            <span className={style.ideal}>Ideal</span>
                        </span>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 pt-1 text-center"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                        </Nav>
                        <Nav.Link
                            className={`${style.announceBtn} text-center mb-3 mb-sm-0 ms-sm-3`}
                            onClick={handleCreateAd}
                        >
                            Anunciar
                        </Nav.Link>

                        {auth?.user ?
                            <NavDropdown
                                title={`Olá, ${auth.user?.nome}`}
                                className={`${style['profile-btn']} ms-sm-2`}
                                align='end'
                            >
                                <NavDropdown.Item onClick={handleMyAds}>
                                    Meus Anúncios
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout}>
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown > :

                            <Nav.Link
                                className={`${style.announceBtn} text-center mb-3 mb-sm-0 ms-sm-3`}
                                onClick={handleMyAds}
                            >
                                Meus anúncios
                            </Nav.Link>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal showModal={isModalOpen} modalCtrl={setIsModalOpen} />
        </>
    );
}
