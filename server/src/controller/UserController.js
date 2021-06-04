const User = require('../model/User');

module.exports = {
	async createUser(req, res) {
		const { cpf, nome, ativo, senha, perfil, idade, email, genero } = req.body;

		const user = await User.create({
			cpf,
			nome,
			ativo,
			senha,
			perfil,
			idade,
			email,
			genero,
		});

		return res.json(user);
	},
	async findAllUsers(req, res) {
		const users = await User.findAll();
		console.log("backend response"+res.json(users));
		return res.json(users);
	},
	async disable_enableUser(req, res) {
		const {id_user} = req.params;
		console.log(id_user)
		const user = await User.findByPk(id_user);
		if (user.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: id_user,
					},
				}
			);
			const change = `usuario com id ${id_user} foi desativado`;
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
			const change = `usuario com id ${id_user} foi ativado`;
			return res.json(change);
		}
	},
	async deleteUser(req, res) {
		const {id_user} = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `usuario com id ${id_user} deletado com sucesso`;
		return res.json(success);
	},
};
