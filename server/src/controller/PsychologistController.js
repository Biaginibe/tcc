const User = require('../model/User');
const Client = require('../model/Client');
const Psychologist = require('../model/Psychologist');
const { QueryTypes } = require('sequelize');
const { update } = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports = {
	async createpsychologist(req, res) {
		const { id_cliente } = req.params;
		const {
			metodologia,
			numeroContato,
			prefFaixaEtaria,
			valorConsulta,
			tempoSessao,
			tipoAtendimento,
			descricao,
			fila,
			crp,
		} = req.body;

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
			fila,
			crp,
			id_cliente,
		});

		return res.json(psychologist);
	},
	
	async findAllPerfil(req, res) {
		const psychologist = await Psychologist.findAll();

		if (!psychologist) {
			return res.status(400).json({ error: 'Not found' });
		}

		return res.json(psychologist);
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
		const { id_user } = req.params;

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
		const { id_user } = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `Psychologist whith id ${id_user} has been successfully deleted`;
		return res.json(success);
	},
	
	async findPsychologistsjoinUsers(req, res) {
		const { id_user } = req.params;

		console.log(id_user)

		const data = await User.sequelize.query(
			`SELECT u.*, p.*, c.endereco from users u INNER JOIN clients c
		ON (u.id = c.id_user)
		INNER JOIN psychologists p
		ON (c.id = p.id_cliente)
		WHERE u.id = ${id_user}`,
			{ type: QueryTypes.SELECT }
		);

		console.log(data)

		data[0].endereco = data[0].endereco.split('-').slice(0, 1);

		success = `Sucesso`;
		return res.json(data);
	},

	async updatePsychologists(req, res) {
		const { id_psycho } = req.params;
		const {
			nome,
			idade,
			email,
			crp,
			numeroContato,
			valorConsulta,
			metodologia,
			tempoSessao,
			tipoAtendimento,
			prefFaixaEtaria,
			descricao,
		} = req.query;

		const psychoUpdate = await Psychologist.findOne({
			where: {
				id: id_psycho,
			},
			include: [
				{
					model: Client,
					as: 'client',
					include: {
						model: User,
						as: 'user',
					},
				},
			],
		});
		let id_user = psychoUpdate.dataValues.client.user.id;

		try {
			await User.update(
				{
					nome: nome,

					idade: idade,
					email: email,
				},
				{
					where: {
						id: id_user,
					},
				}
			);
		} catch (err) {
			console.log(err);
		}

		if (psychoUpdate.dataValues.crp == crp) {
			try {
				await Psychologist.update(
					{
						numeroContato: numeroContato,
						valorConsulta: valorConsulta,
						metodologia: metodologia,
						tempoSessao: tempoSessao,
						tipoAtendimento: tipoAtendimento,
						prefFaixaEtaria: prefFaixaEtaria,
						descricao: descricao,
					},
					{
						where: {
							id: id_psycho,
						},
					}
				);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await Psychologist.update(
					{
						crp: crp,
						numeroContato: numeroContato,
						valorConsulta: valorConsulta,
						metodologia: metodologia,
						tempoSessao: tempoSessao,
						tipoAtendimento: tipoAtendimento,
						prefFaixaEtaria: prefFaixaEtaria,
						descricao: descricao,
					},
					{
						where: {
							id: id_psycho,
						},
					}
				);
			} catch (err) {
				console.log(err);
			}
		}

		return res.json(psychoUpdate);
	},

	async updatePsychologistsPassword(req, res) {
		const { id_psycho } = req.params;
		const { senha, novaSenha } = req.body;

		const psychoUpdate = await Psychologist.findOne({
			where: {
				id: id_psycho,
			},
			include: [
				{
					model: Client,
					as: 'client',
					include: {
						model: User,
						as: 'user',
					},
				},
			],
		});

		let id_user = psychoUpdate.dataValues.client.user.id;

		if (
			!(await bcrypt.compare(
				senha,
				psychoUpdate.dataValues.client.user.senha
			))
		) {
			return res.status(400).send({ err: 'Senha atual incorreta.' });
		}

		const senhaHash = await bcrypt.hash(novaSenha, 8);

		await User.update(
			{
				senha: senhaHash,
			},
			{
				where: {
					id: id_user,
				},
			}
		);

		return res.sendStatus(200);
	},
};
