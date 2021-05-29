const User = require('../model/User');

module.exports = {
	async findAllPatientes(req, res) {
		const Patientes = await User.findAll({ 
			where: {
				perfil: 3,
			},
		});
        return res.json(Patientes);
	},
};
