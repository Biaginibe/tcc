import "../../Pages/Admin/css/style.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBarAdmin(/*nome*/) {
  return (
    <header className="navbarDesktop">
      <div className="links-container">
        <Link to="/" className="logo">
          SendHelp
        </Link>
        <Link to="/Paciente" className="optionNav">
          Pacientes
        </Link>
        <Link to="/Psicologo" className="optionNav">
          Psicologo
        </Link>
        {/* <p className="bemvindo">Bem vindo, nome | sair</p> */}
        <div className="logologout">
          <Link to="/">
              <FaSignOutAlt size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBarAdmin;
