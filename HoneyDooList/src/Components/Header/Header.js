import './Header.scss';
import { FaTasks } from 'react-icons/fa';

export default function Header() {
    return(
        <header>
            <div className='title'><FaTasks />Todo App</div>
            <div className='author'>by Austin Gilfillan-Penhale</div>
        </header>
    );
};