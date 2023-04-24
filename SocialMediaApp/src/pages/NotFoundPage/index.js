import PageContainer from "../../components/PageContainer";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <PageContainer title="Page Not Found">
            <p>Please Check URL</p>
            <ul>
                <li>
                    <Link to='/'>Click Here</Link> to go home!
                </li>
            </ul>
        </PageContainer>
    )
}