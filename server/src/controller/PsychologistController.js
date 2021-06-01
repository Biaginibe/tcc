const User = require('../model/User');

module.exports = {
    async findAllPsycologists(req, res){
        
            const Psycologists = await User.findAll({ 
                where: {
                    perfil: 2,
                },
            });
            return res.json(Psycologists);
        
    },
    async disable_enablePsychologist(req, res) {
		const psychologist = await User.findOne({  
            
            where: {
                id: req.body.id
            },
        });
        //console.log(user.dataValues.ativo)
		if (psychologist.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: req.body.id,
					},
				}
			);
			const change = `psicologo com id ${req.body.id} foi desativado`;
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
			const change = `psicologo com id ${req.body.id} foi ativado`;
			return res.json(change);
		}
	},
	async deletePsychologist(req, res) {
		await User.destroy({
			where: {
				id: req.body.id,
			},
		});
		success = `psicologo com id ${req.body.id} deletado com sucesso`;
		return res.json(success);
	},
}