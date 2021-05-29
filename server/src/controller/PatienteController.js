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
		const patiente = await User.findOne({  
            
            where: {
                id: req.body.id
            },
        });
        //console.log(user.dataValues.ativo)
		if (patiente.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: req.body.id,
					},
				}
			);
			const change = `paciente com id ${req.body.id} foi desativado`;
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
			const change = `paciente com id ${req.body.id} foi ativado`;
			return res.json(change);
		}
	},
	async deletePatiente(req, res) {
		await User.destroy({
			where: {
				id: req.body.id,
			},
		});
		success = `paciente com id ${req.body.id} deletado com sucesso`;
		return res.json(success);
	},
};
