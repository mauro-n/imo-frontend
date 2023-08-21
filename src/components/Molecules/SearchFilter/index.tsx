import style from './style.module.scss';

export const SearchFilter = () => {
    return (
        <div className={`${style['searchFilter-container']} mt-lg-3`}>
            <h3 className='h5'>Filtros</h3>
        </div>
    )
}