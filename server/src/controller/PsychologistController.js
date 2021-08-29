const User = require('../model/User');
const Client = require('../model/Client');
const Psychologist = require('../model/Psychologist');
const { QueryTypes } = require('sequelize');

module.exports = {
	async createPerfilPsychologist(req, res) {
		const { id_cliente } = req.params;
		const { metodologia, numeroContato,	prefFaixaEtaria, valorConsulta,	tempoSessao, tipoAtendimento, descricao, crp } = req.body;

		const client = await Client.findByPk(id_cliente);

		if (!client) {
			return res.status(400).json({ error: 'Client not found.' });
		}

		const psychologist = await Psychologist.create({
			metodologia, 
            numeroContato, 
            prefFaixaEtaria,
            valorConsulta,
            tempoSessao,
            descricao,
            tipoAtendimento,
            crp,
			id_cliente
		});

		return res.json(psychologist);
	},
	async findAllPerfil(req, res){
			const perfilPsychologist = await Psychologist.findAll();
	
			if (!perfilPsychologist) {
				return res.status(400).json({ error: 'Not found' });
			}
	
			return res.json(perfilPsychologist);
		
	},
	async findAllPsycologists(req, res) {
		const psycologists = await User.findAll({
			where: {
				perfil: 2,
			},
		});
		return res.json(psycologists);
	},
	async disable_enablePsychologist(req, res) {
		const {id_user} = req.params;

		const psychologist = await User.findOne({
			where: {
				id: id_user,
			},
		});
		if (psychologist.dataValues.ativo) {
			await User.update(
				{ ativo: false },
				{
					where: {
						id: id_user,
					},
				}
			);
			const change = `Psychologist whith id ${id_user} has been successfully disabled`;
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
			const change = `Psychologist whith id ${id_user} has been successfully actived`;
			return res.json(change);
		}
	},
	async deletePsychologist(req, res) {
		const {id_user} = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `Psychologist whith id ${id_user} has been successfully deleted`;
		return res.json(success);
	},
	async findPsychologistsjoinUsers(req, res) {
		const {id_user} = req.params;
		const psycologist = await Psychologist.findAll({
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
		return res.json(psycologist);
	},
	
};
