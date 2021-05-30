import '../../Styles/Global.css';
import NavBarAdmin from '../../Components/NavBar_admin/NavBarAdmin';
import TabelaAdmin from '../../Components/Tabelas_Admin/TabelaAdmin';
import {Link} from 'react-router-dom';

/*VAI SER NOSSO INDEX NA TELA DO ADMIN*/

function Admin() {
  return (
    <div> 
      <NavBarAdmin />
      <h1>Página do Adminstrador</h1>

      <div className="container-btns">
        <Link to="cliente/admin"><button></button></Link>
        <button></button>
      </div>
    </div>
  );
}

export default Admin;