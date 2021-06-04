'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('schedules', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			diaDisponivel: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			horarioDisponivel: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			disponivel: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
      id_psicologo: {
        type: Sequelize.INTEGER,
				allowNull: false,
        references: { model: 'psychologists', key: 'id'},
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
		await queryInterface.dropTable('schedules');
	},
};
