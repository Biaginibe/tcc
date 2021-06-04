import React from 'react';
import "./css/table.css"
const UserTable = (props) => {
    return (
        <div className="table-wrapper">
        <table className="fl-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>CPF</th>
                    <th>Ativo</th>
                    <th>Perfil</th>
                    <th>Idade</th>
                    <th>Email</th>
                    <th>Genêro</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, nome, cpf, ativo, perfil, idade, email, genero} = user;
                        console.log(ativo);
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nome}</td>
                                <td>{cpf}</td>
                                <td>{ativo===true ? "ativo" : "desativado"}</td>
                                <td>{perfil===2 ? "psicólogo" : perfil===3 ? "paciente" : "admin" }</td>
                                <td>{idade}</td>
                                <td>{email}</td>
                                <td>{genero}</td>
                                <td>
                                    <button onClick={() => props.deleteUser(id)}>Delete</button>
                                    <button onClick={() => props.editUser(id, user)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
        </div>
    )
}

export default UserTable;
