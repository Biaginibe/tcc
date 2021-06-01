import '../../Styles/Global.css';
import NavBarAdmin from '../../Components/NavBar_admin/NavBarAdmin';
import TabelaAdmin from '../../Components/Tabelas_Admin/TabelaAdmin';
import {Link} from 'react-router-dom';
import Example from '../../Components/CRUDTable/index';

/*VAI SER NOSSO INDEX NA TELA DO ADMIN*/
const teste=[
  {
    id:1,
    nome: "alonso",
    idade: 16,
    tipo: "paciente",
  },
  {
    id:2,
    nome: "afonso",
    idade: 17,
    tipo: "paciente",
  }

]

function Admin() {
  return (
    <div> 
      <NavBarAdmin />
      <h1>Página do Adminstrador</h1>
      <Example/>
      {/* <ul className="expenses-list">
              <li className="table-title">
                <small>Gastos Recentes</small>
                <br />
                
              </li>
              {teste.map(({ id, nome, idade, tipo }) => (
                <li key={id} className="list-item positive">
                  {nome}
                  <span
                    className={
                      idade === "gasto" ? "value positive" : "value negative"
                    }
                  >
                    {tipo}
                    
                  </span>
                </li>
              ))}
              
            </ul> */}
      </div>
    
  );
}

export default Admin;