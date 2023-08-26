import { Col, Container, Row } from "react-bootstrap"
import { NavbarComp } from "../../components/Organisms/Navbar"
import { ProfileSideBar } from "../../components/Organisms/ProfileSideBar"
import { Outlet } from "react-router-dom"
import { Footer } from "../../components/Organisms/Footer"

export const ProfileTemplate = () => {
    return (
        <>
            <NavbarComp />
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} lg={2}>
                        <ProfileSideBar />
                    </Col>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}