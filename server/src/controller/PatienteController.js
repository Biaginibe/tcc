const User = require('../model/User');
const Psychologist = require('../model/Psychologist');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
		const { id_user } = req.params;
		const patiente = await User.findOne({
			where: {
				id: id_user,
			},
		});
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
		const { id_user } = req.params;
		await User.destroy({
			where: {
				id: id_user,
			},
		});
		success = `Patiente whith id ${id_user} has been successfully deleted`;
		return res.json(success);
	},
	
	async findPacientejoinUsers(req, res) {
		const { id_user } = req.params;
		const patiente = await User.findAll({
			where: {
				id: id_user,
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
		success = `Sucesso`;
		return res.json(patiente);
	},
	
	async findOnebyIDPatientes(req, res) {
		const { id_user } = req.params;
		const Patientes = await User.findOne({
			where: {
				id: id_user,
			},
		});
		return res.json(Patientes);
	},

	async updatePatientes(req, res) {
		const { id_user } = req.params;
		const { nome, idade, email } = req.query;
		const updateUser = await User.findOne({
			where: {
				id: id_user,
			},
		});

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

		return res.json(updateUser);
	},

	async updatePatientesPassword(req, res) {
		const { id_user } = req.params;
		const { senha, novaSenha } = req.body;

		const updateUser = await User.findOne({
			where: {
				id: id_user,
			},
		});

		if (!(await bcrypt.compare(senha, updateUser.senha))) {
			console.log('CAI AQUI NO IF OH!!!!');
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

	async findPsychologistNumberById(req, res) {
		const { id_psycho } = req.body;

		const psychologist = await User.sequelize.query(
			`SELECT p.id 
			FROM users u 
			INNER JOIN clients c ON c.id_user = u.id
			INNER JOIN psychologists p ON p.id_cliente = c.id
			WHERE u.id=${id_psycho}`,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const psycho = await Psychologist.findOne({
			where: { id: id_psicologo },
		});

		let numeroContato = psycho.dataValues.numeroContato;

		return res.json(numeroContato);
	},
};
