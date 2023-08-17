import { useState, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';

export const SearchResults = () => {
    const axios = useAxios();
    const [results, setResults]: [any[], any] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        const response = await axios.get('/content');
        setResults([response?.data]);
    }

    return (
        <div>
            {results.length > 0 ?
                results.map((el) => {
                    return <div key={el}>{el.content}</div>
                }) :
                <div>Carregando</div>
            }
        </div>
    )
}