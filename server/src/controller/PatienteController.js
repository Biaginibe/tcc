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
			const change = `Patiente whith id ${id_user} has been successfully disabled`;
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
			const change = `Patiente whith id ${id_user} has been successfully actived`;
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
		success = `Patiente whith id ${id_user} has been successfully deleted`;
		return res.json(success);
	},
	async findPacientejoinUsers(req, res) {
		const {id_user} = req.params;
		const patiente = await User.findAll({
			where: {
				id: id_user,
			},
			include: [{
				model: Client,
				as: 'client',
				include:{
					model: User,
					as: 'user'
				}
			}]
		});
		success = `Sucesso`;
		return res.json(patiente);
	},
};
