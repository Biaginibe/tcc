import React from 'react';

const UserTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>CPF</th>
                    <th>Ativo</th>
                    <th>Perfil</th>
                    <th>Idade</th>
                    <th>Email</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, nome, cpf, ativo, perfil, idade, email, genero} = user;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nome}</td>
                                <td>{cpf}</td>
                                <td>{ativo}</td>
                                <td>{perfil}</td>
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
    )
}

export default UserTable;
