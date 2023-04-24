import PageContainer from "../../components/PageContainer";
import { NavLink, Outlet } from "react-router-dom";
import './styles.scss';

export default function CompanyInfo() {

    return (
        <PageContainer title="Company Information"  className=' help-page'>
            <article>
                <Outlet />
            </article>

            <aside>
                <NavLink to='/companyInfo' end>Company Info</NavLink>
                <NavLink to='/companyInfo/mission'>Our Mission Statment</NavLink>
                <NavLink to='/companyInfo/policy'>Company Policy</NavLink>
            </aside>
        </PageContainer>
    );
}
