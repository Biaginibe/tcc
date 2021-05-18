import '../../Styles/Global.css';
import {
    FaUser,
    FaChartBar,
    FaUserCog,
    FaQuestionCircle,
  } from "react-icons/fa";

function NavBarAdmin(/*nome*/){

    return (
        <header className="navbarDesktop">
            <p className="logo">SendHelp</p>
            <p className="optionNav">Pacientes</p>
            <p className="optionNav">Psicologos</p>
            <p className="bemvindo">Bem vindo, nome | sair</p>
            <a className="user"><FaUser /></a>
        </header>
    );

}

export default NavBarAdmin;