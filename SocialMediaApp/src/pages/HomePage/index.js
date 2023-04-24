import PageContainer from "../../components/PageContainer";
import Posts from "../../components/Posts";

export default function HomePage() {
    return (
        <PageContainer title='Welcome to My App'>
            <h2>Promoted Posts:</h2>
            <Posts showOnlyPromoted={true}/>
        </PageContainer>
    );
}
