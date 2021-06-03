import React, { useState, useEffect } from "react";
import "../../Styles/Global.css";
import {useFetch} from "../../Hooks/useFetch";
import  useAsyncRequest  from "../../Hooks/useAsyncRequest";
import NavBarAdmin from "../../Components/NavBar_admin/NavBarAdmin";
import TabelaAdmin from "../../Components/Tabelas_Admin/TabelaAdmin";
import { Link } from "react-router-dom";
import Example from "../../Components/CRUDTable/index";

import UserTable from "../../Components/UserTable/UserTable";
import AddUserForm from "../forms/AddUserForm";
import EditUserForm from "../forms/EditUserForm";

/*VAI SER NOSSO INDEX NA TELA DO ADMIN*/




const Admin = () => {
  const [data, loading] = useAsyncRequest();
  // Fixed array of users:
  // const [users, setUsers] = userList;
  const [users, setUsers] = useState(null);

  

  const addUser = (user) => {
    user.id = users.length;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, name: "", cpf: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

  return (
    <div className="container">
      <NavBarAdmin />
        <h1>Página do Adminstrador</h1>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        {loading || !users ? (
          <p>Loading...</p>
        ) : (
          <div className="seven columns">
            <h2>View users</h2>

            <UserTable
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          </div>
        )}
      </div>
    </div>
  );
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