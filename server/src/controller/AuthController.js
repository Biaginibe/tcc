const User = require('../model/User');
const Client = require('../model/Client');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
	async signIn(req, res) {
		try {
			const { cpf, pass } = req.body; //no front vou passar as variaveis assim: axios.post('rota', {cpf, pass})

			const user = await User.findOne({ where: { cpf: cpf } });

			console.log('PASS PORRA ' + pass);
			console.log(user);

			if (!user) {
				console.log('user error');
				return res
					.status(400)
					.send({ error: 'Usuario não encontrado!' });
			}

			if (pass != user.senha) {
				console.log('pass error');
				return res.status(400).send({ error: 'Senha incorreta.' });
			}

			let type;
			if (user.perfil == 1) {
				type = 'admin';
			} else if (user.perfil == 2) {
				type = 'psicologo';
			} else {
				type = 'paciente';
			}

			const token = jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: 1209600, //14 dias
			});

			return res.send({
				user,
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
				senha,
				perfil,
				idade,
				email,
				genero,
			});

			let type;
			if (user.perfil == 1) {
				type = 'admin';
			} else if (user.perfil == 2) {
				type = 'psicologo';
			} else {
				type = 'paciente';
			}

			return res.json({
				user,
				type,
			});
		} catch {
			return res.status(400).send({
				error: 'Falha no registro, por favor tente novamente.',
			});
		}
	},

	async createClient(req, res) {
		const { id_user } = req.params;
		const { endereco, latitude, longitude } = req.body;
		console.log(latitude)
		console.log(longitude)
		const user = await User.findByPk(id_user);

		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

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

		return res.send({ client, token });
	},

	async validateToken(req, res) {
		const token = req.body.token || '';

		jwt.verify(token, authConfig.secret, function (err, decoded) {
			console.log(!err);

			return res.status(200).send({ valid: !err });
		});
	},
};
