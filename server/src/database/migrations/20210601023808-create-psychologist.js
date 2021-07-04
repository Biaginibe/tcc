'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('psychologists', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			metodologia: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			numeroContato: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			prefFaixaEtaria: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			valorConsulta: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tempoSessao: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			descricao: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tipoAtendimento: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			crp: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			id_cliente: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'clients', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('psychologists');
	},
};
