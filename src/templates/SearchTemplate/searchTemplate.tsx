import { Col, Container, Row } from "react-bootstrap"
import { SearchForm } from "../../components/Molecules/SearchForm"
import { NavbarComp } from "../../components/Organisms/Navbar"
import { SearchResults } from "../../components/Organisms/SearchResults"
import { SearchFilter } from "../../components/Molecules/SearchFilter"

export const SearchTemplate = () => {
    return (
        <>
            <NavbarComp />
            <Container>
                <SearchForm />
                <Row>
                    <Col xs={12} lg={3}>
                        <SearchFilter />
                    </Col>
                    <Col xs={12} lg={9}>
                        <SearchResults />
                    </Col>
                </Row>
            </Container>
        </>
    )
}