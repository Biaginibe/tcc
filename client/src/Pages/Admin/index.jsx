import React, { useState, useEffect } from "react";
import "../../Styles/Global.css";
// import { useFetch } from "../../Hooks/useFetch";
// import useAsyncRequest from "../../Hooks/useAsyncRequest";
import NavBarAdmin from "../../Components/NavBar_admin/NavBarAdmin";
// import TabelaAdmin from "../../Components/Tabelas_Admin/TabelaAdmin";
// import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "axios-hooks";
import UserTable from "../../Components/UserTable/UserTable";
import { useAuth } from "../../Context/AuthContext";
// import AddUserForm from "../forms/AddUserForm";
// import EditUserForm from "../forms/EditUserForm";

/*VAI SER NOSSO INDEX NA TELA DO ADMIN*/

const Admin = () => {
  const [users, setUsers] = useState(null);
  const { token, user, signOut, signIn, type } = useAuth();
  const config = {
    headers: {
      'Authorization': "Bearer " + token,
    },
  };
  
  const [{ data, loading, error }, refetch] = useAxios({
    url: "http://localhost:3333/admin/findUsers",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  // const [
  //   { data: putData, loading: putLoading, error: putError },
  //   executePut
  // ] = useAxios(
  //   {
  //     url: 'https://api.myjson.com/bins/820fc',
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   },
  //   { manual: true }
  // )

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3333/admin/${id}/deleteUser`,id, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Erro!!", error);
      });
  };
  console.log(token);
  const enableUser = (id, e) => {
    axios
      .put(`http://localhost:3333/admin/${id}/disable_enablePatiente`,id, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUsers(users);
        refetch();
        // <- o refetch funciona como um atualizador da tabela, mas ao mesmo tempo ele recarrega todos os outros componentes(faz parecer que deu refresh na p??gina)
      })
      .catch((error) => {
        console.error("Erro!!", error);
      });
  };

  // eventual fun????o pra cancelar fetch
  const externalRefetch = async () => {
    try {
      await refetch();
    } catch (e) {}
  };

  useEffect(() => {
    if (data !== null) {
      setUsers(data);
    }
  }, [data]);

  console.log(users);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (users) {
    return (
      <div className="container">
        <NavBarAdmin />

        {loading || !users ? (
          <p>Carregando...</p>
        ) : (
          <div className="table-container">
            <UserTable
              users={users}
              deleteUser={deleteUser}
              enableUser={enableUser}
              title={"Usu??rios"}
            />
          </div>
        )}
      </div>
    );
  } else return <p>Error!</p>;
};

export default Admin;
