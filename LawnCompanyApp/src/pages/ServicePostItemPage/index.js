import { useParams, Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
// import { useSelector } from 'react-redux';
import NotFoundPage from '../NotFoundPage';
import * as database from '../../database';
import Loading from '../../components/Loading';
import { getCategory } from '../../includes/variables'

import './styles.scss'
import { useEffect, useState } from 'react';


export default function PostItemPage() {
    const params = useParams();
    // const post = useSelector((state) => state.post.posts.find((post) => post.id === params.id));
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load posts from the database
    useEffect(() => {
        (async () => {
            const loadedPost = await database.loadById(params.id);
            setPost(loadedPost);
            setIsLoading(false);
        })();
    
    }, [])


    if (isLoading) {
        return <Loading/>
    }

    if (!post) {
        return <NotFoundPage />
    }

    return (
        <PageContainer title ={post.title} className="post-item-page">
            <div className='picture'>
                <img src={post.picture} alt={post.title} />
            </div>

            <div className='description'>
                {post.address}
            </div>
            <div className='service-type'>
                {getCategory(post.jobType)}
            </div>
            <Link to="/" className="back-link">Back </Link>
        </PageContainer>
    )
}