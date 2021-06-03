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
		const user = await User.findOne({  
            
            where: {
                id: req.body.id
            },
        });
        //console.log(user.dataValues.ativo)
		if (user.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: req.body.id,
					},
				}
			);
			const change = `usuario com id ${req.body.id} foi desativado`;
			return res.json(change);
		} else {
			await User.update(
				{ ativo: true },
				{
					where: {
						id: req.body.id,
					},
				}
			);
			const change = `usuario com id ${req.body.id} foi ativado`;
			return res.json(change);
		}
	},
	async deleteUser(req, res) {
		await User.destroy({
			where: {
				id: req.body.id,
			},
		});
		success = `usuario com id ${req.body.id} deletado com sucesso`;
		return res.json(success);
	},
};
