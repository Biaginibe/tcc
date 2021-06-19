const Client = require('../model/Client');
const User = require('../model/User');
const { QueryTypes } = require('sequelize');
module.exports = {
	async createClient(req, res) {
		const { id_user } = req.params;
		const { endereco, flagLat, latitude, flagLong, longitude } = req.body;

		const user = await User.findByPk(id_user);

		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

		const client = await Client.create({
			endereco,
			latitude,
			longitude,
			id_user,
		});

		return res.send(client);
	},
	async findAllPsychologistClients(req, res) {
		const clients = await Client.sequelize.query("SELECT c.* FROM clients c INNER JOIN users u ON (u.id = c.id_user) WHERE u.perfil= 2;", { type: QueryTypes.SELECT });
		return res.send(clients);
	},
};
