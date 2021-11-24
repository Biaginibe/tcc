import "../../Pages/Admin/css/style.css";
import {Button} from 'react'
import { useAuth } from "../../Context/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";



function NavBarAdmin(/*nome*/) {
  const { signOut } = useAuth();
  let history = useHistory();
  function handlelogout(){
  
    signOut()
    history.push("/")
  }
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
          
          <FaSignOutAlt size={18} onClick={handlelogout} />
        </div>
      </div>
    </header>
  );
}

export default NavBarAdmin;
