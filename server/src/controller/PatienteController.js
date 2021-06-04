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
    async disable_enableUser(req, res) {
		const {id_user} = req.params;
		const patiente = await User.findOne({  
            
            where: {
                id: id_user
            },
        });
        //console.log(user.dataValues.ativo)
		if (patiente.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: id_user,
					},
				}
			);
			const change = `paciente com id ${id_user} foi desativado`;
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
			const change = `paciente com id ${id_user} foi ativado`;
			return res.json(change);
		}
	},
	async deletePatiente(req, res) {
		const {id_user} = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `paciente com id ${id_user} deletado com sucesso`;
		return res.json(success);
	},
};
