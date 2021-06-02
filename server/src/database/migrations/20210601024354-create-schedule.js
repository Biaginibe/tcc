'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('schedule', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			diasDisponiveis: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			horariosDisponiveis: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			fila: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
      id_psicologo: {
        type: Sequelize.INTEGER,
				allowNull: false,
        references: { model: 'psychologist', key: 'id'},
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
		await queryInterface.dropTable('schedule');
	},
};
