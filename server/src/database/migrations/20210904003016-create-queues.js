'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('queues', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			id_psicologo: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'psychologists', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			id_paciente: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			posicao_fila: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('queues');
	},
};
