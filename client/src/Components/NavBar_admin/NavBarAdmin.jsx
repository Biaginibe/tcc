import '../../Pages/Admin/css/style.css';
import {FaUserCircle} from "react-icons/fa";

function NavBarAdmin(/*nome*/){

    return (
        <header className="navbarDesktop">
            <p className="logo">SendHelp</p>
            <p className="optionNav">Pacientes</p>
            <p className="optionNav">Psicologos</p>
            <p className="bemvindo">Bem vindo, nome | sair</p>
            <FaUserCircle size={32} style={{color: '#e8e8e8', margin: 'auto 0', padding:'auto 0'}}/>
        </header>
    );

}

export default NavBarAdmin;