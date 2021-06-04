const Client = require('../model/Client');
const User = require('../model/User');

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
			flagLat,
			latitude,
			flagLong,
			longitude,
			id_user,
		});

		return res.send(client);
	},
};
