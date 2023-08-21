import style from './style.module.scss';
import house from '../../../assets/img/house1.png';
import { SearchForm } from '../../Molecules/SearchForm';

export const SearchHeader = () => {

    return (
        <div className={style.searchHeaderContainer}>
            <div className={`${style.imgContainer} d-none d-lg-block`}>
                <img src={house} className={style.img} alt="" />
            </div>
            <div className={`${style.searchContainer} py-lg-3`}>
                <SearchForm />
            </div>
        </div>
    )
}

