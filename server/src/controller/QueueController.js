const Queue = require('../model/Queue');
const User = require('../model/User');
const { QueryTypes } = require('sequelize');
const { default: axios } = require('axios');
const { count } = require('../model/User');
const Psychologist = require('../model/Psychologist');
const { Op } = require('sequelize');

module.exports = {
	async insertInQueue(req, res) {
		const { id_psico, id_paciente } = req.body;

		const psychologist = await User.sequelize.query(
			`SELECT p.id 
			FROM users u 
		INNER JOIN clients c ON c.id_user = u.id
		INNER JOIN psychologists p ON p.id_cliente = c.id
		WHERE u.id=${id_psico}`,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const count = await Queue.count({
			where: {
				id_psicologo: id_psicologo,
			},
		});

		const results = await Queue.create({
			id_psicologo: id_psicologo,
			id_paciente: id_paciente,
			posicao_fila: count + 1,
		});

		if (!results)
			return res.status(400).json({ error: 'Erro ao inserir na fila.' });

		return res.json(results);
	},

	async quitQueue(req, res) {
		const { id_psico, id_paciente } = req.body;

		const { posicao_fila } = await Queue.findOne({
			where: { id_paciente: id_paciente },
		});

		await Queue.sequelize.query(
			`UPDATE queues SET posicao_fila = (posicao_fila - 1) WHERE posicao_fila > ${posicao_fila} AND id_psicologo = ${id_psico};`,
			{ type: QueryTypes.UPDATE }
		);

		await Queue.destroy({ where: { id_paciente: id_paciente } });

		return res.json(true);
	},

	async hasQueue(req, res) {
		const { id_paciente } = req.body;

		const row = await Queue.findOne({
			where: { id_paciente: id_paciente },
		});

		if (!row) return res.send(false);

		return res.send(true);
	},

	async itsThatQueue(req, res) {
		const { id_paciente, id_psico } = req.body;

		const psychologist = await User.sequelize.query(
			`SELECT p.id 
			FROM users u 
		INNER JOIN clients c ON c.id_user = u.id
		INNER JOIN psychologists p ON p.id_cliente = c.id
		WHERE u.id=${id_psico}`,
			{ type: QueryTypes.SELECT }
		);

		console.log(psychologist);

		const id_psicologo = psychologist[0].id;

		const row = await Queue.findOne({
			where: { id_paciente: id_paciente, id_psicologo: id_psicologo },
		});

		if (!row) return res.json(false);

		return res.json(true);
	},

	async callTheNext(req, res) {
		const { id_user } = req.body;

		const id_psico = await User.sequelize.query(
			`SELECT p.id
        FROM users u 
        INNER JOIN clients c
        ON (u.id = c.id_user)
        INNER JOIN psychologists p
        ON (c.id = p.id_cliente)
        WHERE u.id = ${id_user};`,
			{ type: QueryTypes.SELECT }
		);

		const del = await Queue.findOne({
			where: { id_psicologo: id_psico[0].id, posicao_fila: 0 },
		});

		if (del) {
			await Queue.destroy({
				where: { id_psicologo: id_psico[0].id, posicao_fila: 0 },
			});
		}

		await Queue.sequelize.query(
			`update queues set posicao_fila = posicao_fila - 1 where id_psicologo = ${id_psico[0].id};`,
			{ type: QueryTypes.UPDATE }
		);

		const row = await Queue.findOne({
			where: { id_psicologo: id_psico[0].id, posicao_fila: 0 },
		});

		if (!row) {
			return res.status(400).json({ error: 'A fila está vazia' });
		}

		const user = await User.findOne({
			where: { id: row.dataValues.id_paciente },
		});

		axios.post('https://exp.host/--/api/v2/push/send', {
			to: user.dataValues.notificationToken,
			sound: 'default',
			title: 'Chegou a sua vez!',
			body: 'Entre em contato com o profissional que você estava na fila, agora na tela do perfil dele você vai encontrar um botão para contato',
		});

		const data = row.dataValues;

		return res.json(data);
	},

	async position(req, res) {
		const { id_paciente } = req.body;

		const data = await Queue.findOne({
			where: { id_paciente: id_paciente },
		});

		if (!data) {
			return res.json(null);
		}

		const posicao = data.dataValues.posicao_fila;

		return res.json(posicao);
	},

	async count(req, res) {
		const { id_psico } = req.body;

		const count = await Queue.count({
			where: {
				id_psicologo: id_psico,
				posicao_fila: { [Op.gte]: 1 },
			},
		});

		return res.json(count);
	},

	async disable_enableQueue(req, res) {
		const { id_psico } = req.body;

		const count = await Queue.count({
			where: {
				id_psicologo: id_psico,
				posicao_fila: { [Op.gte]: 1 },
			},
		});

		if (count == 0) {
			const { fila } = await Psychologist.findOne({
				where: { id: id_psico },
			});

			await Psychologist.update(
				{ fila: !fila },
				{ where: { id: id_psico } }
			);

			if (!fila) {
				res.json(true);
			} else {
				console.log('retornei falso');
				res.json(false);
			}
		} else {
			res.status(400).send({
				error: 'Você não pode desabilitar sua fila, ainda existem pacientes nela.',
			});
		}
	},

	async checkQueue(req, res) {
		const { id_user } = req.body;

		const psychologist = await User.sequelize.query(
			`SELECT p.id 
			FROM users u 
		INNER JOIN clients c ON c.id_user = u.id
		INNER JOIN psychologists p ON p.id_cliente = c.id
		WHERE u.id=${id_user}`,
			{ type: QueryTypes.SELECT }
		);

		console.log(psychologist);

		const id_psico = psychologist[0].id;

		const { fila } = await Psychologist.findOne({
			where: { id: id_psico },
		});

		console.log(fila);

		res.send(fila);
	},
};
