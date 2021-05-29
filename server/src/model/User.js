const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init({
            cpf: DataTypes.STRING, 
            nome: DataTypes.STRING, 
            ativoInativo: DataTypes.STRING,
            senha: DataTypes.STRING,
            perfil: DataTypes.INTEGER,
            idade: DataTypes.INTEGER,
            email: DataTypes.STRING,
            genero: DataTypes.STRING,
        }, {sequelize});
	}
}

module.exports = User;
