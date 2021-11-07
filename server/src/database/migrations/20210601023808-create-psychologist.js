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
			},
			numeroContato: {
				type: Sequelize.STRING,
			},
			prefFaixaEtaria: {
				type: Sequelize.STRING,
			},
			valorConsulta: {
				type: Sequelize.STRING,
			},
			tempoSessao: {
				type: Sequelize.STRING,
			},
			descricao: {
				type: Sequelize.STRING,
			},
			tipoAtendimento: {
				type: Sequelize.STRING,
			},
			crp: {
				type: Sequelize.STRING,
				unique: true,
			},
			fila: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
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
