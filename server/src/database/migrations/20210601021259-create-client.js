'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('clients', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			endereco: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			flagLat: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			latitude: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			flagLong: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			longitude: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			id_user: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'users', key: 'id' },
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
		await queryInterface.dropTable('clients');
	},
};
