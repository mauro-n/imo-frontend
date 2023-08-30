import { axiosBasic } from '../../api/axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { NavbarComp } from "../../components/Organisms/Navbar"
import { Post } from '../../components/Organisms/Post';
import { Footer } from '../../components/Organisms/Footer';

export const PostPageTemplate = () => {
    const POST_URL = 'announce/';
    /* Hooks */
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location?.state?.postId;
    /* State */
    const [post, setPost] = useState<App.house>();

    useEffect(() => {
        if (!postId) return navigate(-1);
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const response = await axiosBasic.get(`${POST_URL}${postId}`);
            setPost(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <NavbarComp />
            {post ?
                <Post data={post} />
                : 'Carregando'
            }
            <Footer />
        </>
    )
}