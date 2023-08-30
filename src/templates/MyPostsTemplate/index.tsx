import style from './style.module.scss';
/* Hooks */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosBasic } from '../../api/axios';
/* Components */
import { PostCard } from '../../components/Molecules/PostCard';
import { Heading } from '../../components/Atoms/Heading';
import { Loading } from '../../components/Atoms/Loading';

export const MyPostsTemplate = () => {
    const POSTS_URL = 'user/get-posts';
    /* State */
    const [posts, setPosts] = useState<App.house[]>([]);
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    /* Hooks */
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axiosBasic.get(`${POSTS_URL}`);
            setPosts(response.data);
        } catch (err: any) {
            if (!err.response) return setErrMsg('Sem serviço');
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className='pt-3'>
            {errMsg ? <p>{errMsg}</p> : <></>}
            <Heading as='h1' size='lg' center={false}>
                Meus Anúncios
            </Heading>
            <div className='text-xs-center text-lg-start mt-3'>
                <button
                    className={style['create-btn']}
                    onClick={() => navigate('/profile/create-ad', { replace: true })}
                >
                    Criar anúncio
                </button>
            </div>
            <div className={style['searchResults-container']}>
                {posts.length > 0 ?
                    posts.map((house) => {
                        return (
                            <PostCard
                                key={house.codigo}
                                house={house}
                                action={setPosts}
                                owner
                            />
                        )
                    }) :
                    isLoading ?
                        <Loading /> :
                        <p>Você não possui posts.</p>
                }
            </div>
        </section>
    )
}