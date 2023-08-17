import { CarrouselAds } from "../../components/CarrouselAds";
import { Categories } from "../../components/Categories";
import { Footer } from "../../components/Footer";
import { Latest } from "../../components/Latest";
import { NavbarComp } from "../../components/Navbar";
import { SearchHeader } from "../../components/SearchHeader";

export const HomeTemplate = () => {
    return (
        <>
            <NavbarComp />
            <SearchHeader />
            <CarrouselAds />
            <Latest />
            <Categories />
            <Footer></Footer>
        </>
    );
}