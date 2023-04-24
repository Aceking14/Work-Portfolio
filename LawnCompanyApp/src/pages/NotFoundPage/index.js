import PageContainer from "../../components/PageContainer";
import { Link } from "react-router-dom";
import PageNotFound from '../../Images/PageNotFound.jpg'

import './styles.scss'

export default function NotFoundPage() {
    return (
        <PageContainer title="Page Not Found">
            <img src={PageNotFound} alt="Page Not Found" title="notFoundImage"/>
            <ul>
                <li>
                    <Link to='/'>Click Here</Link> to go home!
                </li>
            </ul>
        </PageContainer>
    )
}