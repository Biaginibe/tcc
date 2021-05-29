'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			cpf: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ativoInativo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			senha: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			perfil: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			idade: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			genero: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
	},
};
