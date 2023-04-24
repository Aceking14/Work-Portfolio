import './styles.scss';
import { NavLink } from 'react-router-dom';

import { GiHelp, GiHouse,GiPapers } from "react-icons/gi";


export default function MainMenu() {
    return (
        <nav className='main'>
            <NavLink to='/'><GiHouse/>Home</NavLink>
            <NavLink to='/companyInfo'><GiPapers/>Company Info</NavLink>
            <NavLink to='/help'><GiHelp/>Help</NavLink>
        </nav>
    )
}