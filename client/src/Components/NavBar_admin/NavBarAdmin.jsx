import '../../Pages/Admin/css/admin.css';
import {FaUserCircle} from "react-icons/fa";

function NavBarAdmin(/*nome*/){

    return (
        <header className="navbarDesktop">
            <p className="logo">SendHelp</p>
            <p className="optionNav">Pacientes</p>
            <p className="optionNav">Psicologos</p>
            <p className="bemvindo">Bem vindo, nome | sair</p>
            <i class="fas fa-code fa-5x" className="user"><FaUserCircle /></i>
        </header>
    );

}

export default NavBarAdmin;