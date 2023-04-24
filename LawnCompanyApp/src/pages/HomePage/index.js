import PageContainer from "../../components/PageContainer";
import Posts from '../../components/Posts';
import './styles.scss'

import { useNavigate } from "react-router-dom";

export default function PostListPage() {
    const navigate = useNavigate();
    const handleAddPostClick = () => {
      navigate('/posts/add')
    }
    return (
        <PageContainer title='Lawn Services to Complete' >
            <Posts/>

            <div className="add-post-button-container">
                <button onClick={handleAddPostClick}>
                    Add Lawn Service
                </button>
            </div>
        </PageContainer>
    )
}

