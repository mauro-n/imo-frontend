import style from './style.module.scss';
import { useApp } from '../../../hooks/useApp';
import { useEffect, useState } from 'react';
import { SearchResultCard } from '../../Molecules/SearchResultCard';

export const SearchResults = () => {
    const { app } = useApp();
    const [lastSearch, setLastSearch] = useState<any[]>([]);

    useEffect(() => {
        const storedResults = localStorage.getItem('lastSearch');
        if (!storedResults) return;
        const lastResults = JSON.parse(storedResults);
        if (lastResults) return setLastSearch(lastResults);
    }, [app]);

    return (
        <div className={style['searchResults-container']}>
            {app.searchResults.length > 0 ?
                app.searchResults.map((house) => {
                    return <SearchResultCard key={house.codigo} house={house} />
                }) :
                lastSearch.length > 0 ?
                    lastSearch.map((house: App.house) => {
                        return <SearchResultCard key={house.codigo} house={house} />
                    }) :
                    <>
                        <p className='text-center mt-3 mb-0'>Sem resultados para sua busca</p>
                        <p className='text-center mt-1'>
                            Experimente refazer a busca com a barra de pesquisa acima
                        </p>
                    </>
            }
        </div>
    )
}