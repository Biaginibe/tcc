import React, { useState, useEffect } from "react";
import "../../Styles/Global.css";
import { useFetch } from "../../Hooks/useFetch";
import useAsyncRequest from "../../Hooks/useAsyncRequest";
import NavBarAdmin from "../../Components/NavBar_admin/NavBarAdmin";
import TabelaAdmin from "../../Components/Tabelas_Admin/TabelaAdmin";
import { Link } from "react-router-dom";
import axios from 'axios';
import useAxios from "axios-hooks";
import UserTable from "../../Components/UserTable/UserTable";
import AddUserForm from "../forms/AddUserForm";
import EditUserForm from "../forms/EditUserForm";


/*VAI SER NOSSO INDEX NA TELA DO ADMIN*/

const Admin = () => {
  const [users, setUsers] = useState(null);
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3333/deleteUsers/${id}`)  
    .then(res => {  
      console.log(res);  
      console.log(res.data);  
  
      const users = this.state.users.filter(item => item.id !== id);  
      this.setState({ users });  
    })
};

  
  const [{ data, loading, error }, refetch] = useAxios(
    "http://localhost:3333/findUsers"
  );
  console.log(data); 
  
  
    
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if(data){
  return (
    <div className="container">
      <NavBarAdmin />
      <h1>Página do Adminstrador</h1>
      <div className="row">
        <div className="five columns">
         
        </div>
        {loading || !data ? (
          <p>Loading...</p>
        ) : (
          <div className="seven columns">
            <h2>View users</h2>

            <UserTable users={data} deleteUser={deleteUser} />
          </div>
        )}
      </div>
    </div>
  );
        }else return <p>Error!</p>;
};

export default Admin;
// const teste = [
//   {
//     id: 1,
//     nome: "alonso",
//     idade: 16,
//     tipo: "paciente",
//   },
//   {
//     id: 2,
//     nome: "afonso",
//     idade: 17,
//     tipo: "paciente",
//   },
// ];
// const data = [
//   {
//     id: 1,
//     cpf: 1212121211,
//     nome: "Create an example of how to use the component",
//   },
//   {
//     id: 2,
//     cpf: 5543534534,
//     nome: "Improve the component!",
//   },
//   {
//     id: 4,
//     cpf: 234234234,
//     nome: "Create an example of how to use the component",
//   },
//   {
//     id: 3,
//     cpf: 55554444,
//     nome: "Josué",
//     ativo: false,
//     perfil: "psicologo",
//     idade: 18,
//     email: "aaa@111.com",
//     genero: "masc",
//   },
// ];

// function Admin() {
//   const {
//     results,
//     error,
//     loading,
//   } = useFetch("http:/localhost:3333/findUsers");
// console.log(results)
// if (loading)
//     return (
//       <>
//         <h1>CARREGANDO...</h1>
//       </>
//     );

//   if (error)
//     return (
//       <>
//         <h1>ERRO!</h1>
//       </>
//     );
//  if( results )
//   return (
//     <div>
//
//       { console.log("teste"+results)}
//       <Example resultados={results}/>
//       {/* <ul className="expenses-list">
//               <li className="table-title">
//                 <small>Gastos Recentes</small>
//                 <br />

//               </li>
//               {teste.map(({ id, nome, idade, tipo }) => (
//                 <li key={id} className="list-item positive">
//                   {nome}
//                   <span
//                     className={
//                       idade === "gasto" ? "value positive" : "value negative"
//                     }
//                   >
//                     {tipo}

//                   </span>
//                 </li>
//               ))}

//             </ul> */}
//     </div>
//   );
//   else return <h1>Erro, tente novamente</h1>;

// }
