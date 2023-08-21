import { CarrouselAds } from "../../components/Organisms/CarrouselAds";
import { Categories } from "../../components/Organisms/Categories";
import { Footer } from "../../components/Organisms/Footer";
import { Latest } from "../../components/Organisms/Latest";
import { NavbarComp } from "../../components/Organisms/Navbar";
import { SearchHeader } from "../../components/Organisms/SearchHeader";

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