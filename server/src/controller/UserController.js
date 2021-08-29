const User = require('../model/User');

module.exports = {
	
	async findAllUsers(req, res) {
		const users = await User.findAll();
		return res.json(users);
	},
	
	async disable_enableUser(req, res) {
		const { id_user } = req.params;
		const user = await User.findByPk(id_user);
		console.log(user);
		if (user.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: id_user,
					},
				}
			);
			const change = `User whith id ${id_user} has been successfully disabled`;
			return res.json(change);
		} else {
			await User.update(
				{ ativo: true },
				{
					where: {
						id: id_user,
					},
				}
			);
			const change = `User whith id ${id_user} has been successfully activated`;
			return res.json(change);
		}
	},
	
	async deleteUser(req, res) {
		const { id_user } = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `User whith id ${id_user} has been successfully deleted`;
		return res.json(success);
	},
};
