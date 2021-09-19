const User = require('../model/User');
const Client = require('../model/Client');
const Psychologist = require('../model/Psychologist');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');

module.exports = {
	async signIn(req, res) {
		try {
			const { cpf, pass } = req.body;

			const user = await User.findOne({ where: { cpf: cpf } });

			if (!user) {
				return res
					.status(400)
					.send({ error: 'Usuario não encontrado!' });
			}

			if (!(await bcrypt.compare(pass, user.senha))) {
				return res.status(400).send({ error: 'Senha incorreta.' });
			}
			let psychologist = [null];
			let type;
			if (user.perfil == 1) {
				type = 'admin';
			} else if (user.perfil == 2) {
				type = 'psicologo';

				psychologist = await User.sequelize.query(
					`SELECT p.* 
					FROM users u 
					INNER JOIN clients c ON (c.id_user = u.id)
					INNER JOIN psychologists p ON (p.id_cliente = c.id)
					WHERE u.id = ${user.id} LIMIT 1`,
					{ type: QueryTypes.SELECT }
				);
			} else {
				type = 'paciente';
			}
			const token = jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: 1209600, //14 dias
			});

			return res.send({
				user,
				psychologist,
				type,
				token,
			});
		} catch (err) {
			console.log(err);
		}
	},

	async registerUser(req, res) {
		const { cpf, nome, ativo, senha, perfil, idade, email, genero } =
			req.body;
		const senhaHash = await bcrypt.hash(senha, 8);

		let type = perfil;

		//tratamento para ele identificar o perfil e converter para int
		let profile = 0;
		if (perfil == 'paciente') profile = 3;
		else if (perfil == 'psicologo') profile = 2;

		if (await User.findOne({ where: { cpf: cpf } })) {
			return res
				.status(400)
				.send({ error: 'Este CPF já possui uma conta!' });
		}
		try {
			const user = await User.create({
				cpf,
				nome,
				ativo,
				senha: senhaHash,
				perfil: profile,
				idade,
				email,
				genero,
			});

			return res.json({
				user,
				type,
			});
			
		} catch (err) {
			return res.status(400).send({
				error: 'Falha no registro, por favor tente novamente.' + err,
			});
		}
	},

	async createClient(req, res) {
		const { id_user } = req.params;
		const { endereco, latitude, longitude } = req.body;
		const user = await User.findByPk(id_user);

		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

		console.log(user);

		const client = await Client.create({
			endereco,
			latitude,
			longitude,
			id_user,
		});

		if (!client) console.log('erro na criação do cliente');

		const token = jwt.sign({ id: user.id }, authConfig.secret, {
			expiresIn: 1209600, //14 dias
		});
		
		let psychologist = [null]
		// caso seja um psicologo já cria uma linha para ele
		if (user.dataValues.perfil == 2) {
			psychologist = await Psychologist.create({
				metodologia: '',
				numeroContato: '',
				prefFaixaEtaria: '',
				valorConsulta: '',
				tempoSessao: '',
				descricao: '',
				tipoAtendimento: '',
				crp: '',
				id_cliente: client.dataValues.id,
			});
		}

		console.log(psychologist)

		return res.send({ psychologist, token });
	},

	async validateToken(req, res) {
		const token = req.body.token || '';

		jwt.verify(token, authConfig.secret, function (err, decoded) {
			console.log(!err);

			return res.status(200).send({ valid: !err });
		});
	},
};
