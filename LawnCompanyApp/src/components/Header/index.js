import { appName } from "../../includes/variables";
import { GiHighGrass } from "react-icons/gi";

// Importing Styles
import './styles.scss';

// Importing Main Page
import MainMenu from "../MainMenu";

// Exporting Function
export default function Header() {
    return(
        <>
            <header className="main">
            <GiHighGrass />
            <div>{appName}</div>
            </header>
            <MainMenu />
        </>
    );
};