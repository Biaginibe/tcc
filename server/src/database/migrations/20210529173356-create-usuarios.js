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
				unique: true,
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ativo: {
				type: Sequelize.BOOLEAN,
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
			notificationToken: {
				type: Sequelize.STRING,
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
