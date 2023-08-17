import { Col, Container, Row } from "react-bootstrap"
import { NavbarComp } from "../../components/Navbar"
import { ProfileSideBar } from "../../components/ProfileSideBar"
import { Outlet } from "react-router-dom"

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
        </>
    )
}